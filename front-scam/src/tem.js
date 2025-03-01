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
const axios = require("axios");
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

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(compression());
app.use(morgan("combined"));
app.use(cookieParser());

// Secure session management
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === "production", httpOnly: true },
  })
);
app.use(csrf({ cookie: true })); // Ensure it's after session & cookieParser

// CSRF Protection
const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);

// CSRF Token Endpoint
app.get("/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

app.use(
  cors({
    origin: "http://localhost:3000", // Change this if frontend runs elsewhere
    credentials: true, // Allows sending cookies
  })
);


// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later.",
});
app.use(["/signin", "/register", "/forgot-password"], limiter);

// CAPTCHA Middleware
const verifyCaptcha = asyncHandler(async (req, res, next) => {
  const { captchaToken } = req.body;
  if (!captchaToken)
    return res.status(400).json({ error: "CAPTCHA token is required" });

  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`
    );
    const { success } = response.data;

    if (!success) {
      return res.status(403).json({ error: "CAPTCHA verification failed" });
    }

    next();
  } catch (error) {
    console.error("Error verifying CAPTCHA:", error);
    return res.status(500).json({ error: "Error verifying CAPTCHA" });
  }
});

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


// User Registration
app.post(
  "/register",
  verifyCaptcha,
  asyncHandler(async (req, res) => {
    try {
      const { name, dob, email, password, _csrf } = req.body;
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

// Start the server
app.listen(port, () => {
  console.log(`Server running securely on http://localhost:${port}`);
});
