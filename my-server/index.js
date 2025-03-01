require("dotenv").config();
const express = require("express");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const { Pool } = require("pg");
const cors = require("cors");
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const csrf = require("csurf");
const morgan = require("morgan");
const session = require("express-session");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const asyncHandler = require("express-async-handler");
const { verifyCaptcha } = require("./captcha");
const winston = require("winston");

const app = express();
const port = process.env.PORT || 5000;
const saltRounds = 10;

// PostgreSQL Connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.connect()
  .then(() => console.log("✅ Connected to PostgreSQL on port 5434"))
  .catch((err) => console.error("❌ PostgreSQL Connection Error:", err));
  
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(compression());
app.use(morgan("combined"));
app.use(cookieParser());

// Secure session management
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// CSRF Protection
const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later.",
});
app.use(["/signin", "/register", "/forgot-password"], limiter);

// File Upload Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsDir = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedFileTypes = ["image/jpeg", "image/png", "application/pdf"];
    allowedFileTypes.includes(file.mimetype)
      ? cb(null, true)
      : cb(new Error("Invalid file type"), false);
  },
});

// Serve uploaded files securely
app.use("/uploads", express.static("uploads"));

// CAPTCHA Middleware
const verifyHuman = asyncHandler(async (req, res, next) => {
  const { captchaToken } = req.body;
  if (!captchaToken)
    return res.status(400).json({ error: "CAPTCHA token is required" });

  const isHuman = await verifyCaptcha(captchaToken);
  if (!isHuman)
    return res.status(403).json({ error: "CAPTCHA verification failed" });

  next();
});

// User Registration
app.post(
  "/register",
  verifyCaptcha,
  asyncHandler(async (req, res) => {
    try {
      const { name, dob, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      await pool.query(
        "INSERT INTO users (name, dob, email, password) VALUES ($1, $2, $3, $4)",
        [name, dob, email, hashedPassword]
      );

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

// Forgot Password
app.post(
  "/forgot-password",
  verifyCaptcha,
  asyncHandler(async (req, res) => {
    try {
      const { email, dob, newPassword } = req.body;
      const result = await pool.query(
        "SELECT * FROM users WHERE email = $1 AND dob = $2",
        [email, dob]
      );

      if (result.rows.length > 0) {
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
        await pool.query("UPDATE users SET password = $1 WHERE email = $2", [
          hashedPassword,
          email,
        ]);
      }

      res
        .status(200)
        .json({ message: "If the email exists, a reset link will be sent" });
    } catch (error) {
      console.error("Forgot password error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

// Sign-in
app.post(
  "/signin",
  verifyCaptcha,
  asyncHandler(async (req, res) => {
    try {
      const { email, password } = req.body;
      const result = await pool.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);

      if (
        result.rows.length === 0 ||
        !(await bcrypt.compare(password, result.rows[0].password))
      ) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const user = result.rows[0];
      const redirectUrl =
        user.usertype === 1
          ? "/Admin/AdminHome"
          : user.usertype === 2
          ? "/ExternalResources/ExternalResourcesHome"
          : "/Home";

      res.redirect(redirectUrl);
    } catch (error) {
      console.error("Sign-in error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

// Submit Scam Report
app.post(
  "/scam-reports",
  verifyCaptcha,
  upload.single("proof"),
  asyncHandler(async (req, res) => {
    try {
      const { user_id, scam_type, description, scam_date } = req.body;
      if (!user_id || !scam_type || !description || !scam_date)
        return res.status(400).json({ error: "All fields are required" });

      const proofFilePath = req.file ? req.file.path : null;
      const result = await pool.query(
        "INSERT INTO scam_reports (user_id, scam_type, description, scam_date, proof) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [user_id, scam_type, description, scam_date, proofFilePath]
      );

      res.status(201).json({
        message: "Scam report submitted successfully",
        report: result.rows[0],
      });
    } catch (error) {
      console.error("Scam report submission error:", error);
      res.status(500).json({ error: "Error submitting scam report" });
    }
  })
);

// Fetch Scam Reports
app.get(
  "/scam-reports",
  asyncHandler(async (req, res) => {
    try {
      const result = await pool.query("SELECT * FROM scam_reports");
      res.status(200).json(result.rows);
    } catch (error) {
      console.error("Error retrieving scam reports:", error);
      res.status(500).json({ error: "Error retrieving scam reports" });
    }
  })
);
// ######################

// Endpoint to submit contact
app.post("/submit-contact", async (req, res) => {
  const { user_id, message } = req.body;
  const attachment = req.body.attachment || null; // Get the file path, default to null if not provided

  // Validate input
  if (!user_id || !message) {
    return res.status(400).json({ error: "user_id and message are required" });
  }

  let attach = null;
  if (attachment) {
    try {
      attach = fs.readFileSync(attachment); // Read the file as binary
    } catch (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Error reading file");
    }
  }

  try {
    const query = `
            INSERT INTO contacts (user_id, message, attachment)
            VALUES ($1, $2, $3) RETURNING contact_id
        `;
    const values = [user_id, message, attach];

    const result = await pool.query(query, values);
    const contactId = result.rows[0].contact_id;

    res
      .status(201)
      .json({ message: "Contact submitted successfully", contactId });
  } catch (error) {
    console.error("Error submitting contact:", error);
    res
      .status(500)
      .json({ error: "An error occurred while submitting the contact" });
  }
});

// ###########################

// Endpoint to create an admin approval
app.post("/admin-approval", async (req, res) => {
  const { report_id, report_status, verification_notes, severity } = req.body;

  // Validate input
  if (!report_id || !report_status || !severity) {
    return res
      .status(400)
      .json({ error: "report_id, report_status, and severity are required" });
  }

  const query = `
        INSERT INTO admin_approval (report_id, report_status, verification_notes, severity)
        VALUES ($1, $2, $3, $4) RETURNING *
    `;
  const values = [report_id, report_status, verification_notes, severity];

  try {
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error inserting admin approval:", err);
    res.status(500).json({ error: "Error inserting admin approval" });
  }
});

app.put("/admin-approval/:verification_id", async (req, res) => {
  const { verification_id } = req.params;
  const { report_status, verification_notes, severity } = req.body;

  // Validate that verification_id is provided
  if (!verification_id) {
    return res.status(400).json({ error: "verification_id is required" });
  }

  // Build the dynamic query and values
  const fields = [];
  const values = [];
  let query = "UPDATE admin_approval SET ";

  if (report_status) {
    fields.push("report_status = $" + (fields.length + 1));
    values.push(report_status);
  }
  if (verification_notes) {
    fields.push("verification_notes = $" + (fields.length + 1));
    values.push(verification_notes);
  }
  if (severity) {
    fields.push("severity = $" + (fields.length + 1));
    values.push(severity);
  }

  // If no fields to update, return error
  if (fields.length === 0) {
    return res.status(400).json({ error: "No fields provided to update" });
  }

  // Add the WHERE clause to filter by verification_id
  query +=
    fields.join(", ") +
    " WHERE verification_id = $" +
    (fields.length + 1) +
    " RETURNING *";
  values.push(verification_id);

  try {
    const result = await pool.query(query, values);

    // If no rows are affected, the verification_id does not exist
    if (result.rowCount === 0) {
      return res.status(404).json({
        error: "No admin approval found with the provided verification_id",
      });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Error updating admin approval:", err);
    res.status(500).json({ error: "Error updating admin approval" });
  }
});

// Endpoint to user submitted_scam_reports details
app.get("/submitted_scam_reports", async (req, res) => {
  const query = `
        SELECT * FROM submitted_scam_reports
    `;

  try {
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching scam report details:", err);
    res.status(500).json({ error: "Error fetching scam report details" });
  }
});

// #############################

app.post("/external_resources", async (req, res) => {
  const { verification_id, report_status, external_notes } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO external_resources (verification_id, report_status, external_notes)
             VALUES ($1, $2, $3) RETURNING *`,
      [verification_id, report_status, external_notes]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error inserting resource:", err);
    res.status(500).json({ error: "Error inserting resource" });
  }
});

// Endpoint to get scam report details
app.get("/scam-report-details", async (req, res) => {
  const query = `
        SELECT * FROM scam_report_details
    `;

  try {
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching scam report details:", err);
    res.status(500).json({ error: "Error fetching scam report details" });
  }
});

// ###############################

// Endpoint to create a new quiz
app.post("/quizzes", async (req, res) => {
  const { q1, q2, q3, answer } = req.body;

  // Validate input
  if (!q1 || !answer) {
    return res.status(400).json({ error: "q1 and answer are required" });
  }

  const query = `
        INSERT INTO quiz (q1, q2, q3, answer)
        VALUES ($1, $2, $3, $4) RETURNING *
    `;
  const values = [q1, q2, q3, answer];

  try {
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error inserting quiz:", err);
    res.status(500).json({ error: "Error inserting quiz" });
  }
});

// #####################3

// Endpoint to create a new news alert with optional alert_date
app.post("/news-alerts", async (req, res) => {
  const { title, description, imagePath, alertDate } = req.body; // Get alertDate from request body

  // Validate input
  if (!title || !description || !imagePath) {
    return res
      .status(400)
      .json({ error: "Title, description, and image path are required" });
  }

  const query = `
        INSERT INTO news_alert (title, description, alert_date, image_path)
        VALUES ($1, $2, COALESCE($3, CURRENT_TIMESTAMP), $4) RETURNING *
    `;
  const values = [title, description, alertDate || null, imagePath]; // Use alertDate if provided, otherwise null

  try {
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error inserting news alert:", err);
    res.status(500).json({ error: "Error inserting news alert" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running securely on http://localhost:${port}`);
});
