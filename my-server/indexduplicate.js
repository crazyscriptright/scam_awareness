require("dotenv").config();
const express = require("express");
const multer = require("multer");
const { Pool } = require("pg");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const session = require("express-session");
const compression = require("compression");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const pgSession = require("connect-pg-simple")(session);


const app = express();
const port = process.env.PORT || 5000;
const saltRounds = 10;

// PostgreSQL Connection (Port 5434)
const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "scam_awareness",
  password: process.env.DB_PASSWORD || "password",
  port: process.env.DB_PORT || 5434,
});

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(compression());
app.use(morgan("combined"));

// Secure session management
app.use(
  session({
    store: new pgSession({
      pool: pool,
      tableName: "session",
    }),
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 30 * 60 * 1000, // 30 minutes
      sameSite: "strict",
    },
  })
);

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Middleware to check authentication
const isAuthenticated = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "Unauthorized access" });
  }
  next();
};

// Auto logout after inactivity
app.use((req, res, next) => {
  if (req.session.user) {
    req.session.touch();
  }
  next();
});

// REGISTER USER
app.post(
  "/register",
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
      res.status(500).json({ error: "User already registered" });
    }
  })
);

// LOGIN USER
app.post(
  "/signin",
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

      // Regenerate session for security
      req.session.regenerate((err) => {
        if (err) return res.status(500).json({ error: "Session error" });

        req.session.user = {
          id: user.user_id,
          name: user.name,
          userType: user.usertype,
        };

        const redirectUrl =
          user.usertype === 1
            ? "/Admin/AdminHome"
            : user.usertype === 2
            ? "/ExternalResources/ExternalResourcesHome"
            : "/";

        res.json({
          message: "Login successful",
          userName: user.name,
          redirectUrl,
        });
      });
    } catch (error) {
      console.error("Sign-in error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

// FORGOT PASSWORD
app.post(
  "/forgot-password",
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

// CHECK SESSION
app.get("/session", (req, res) => {
  if (req.session.user) {
    res.json({
      loggedIn: true,
      userType: req.session.user.userType,
    });
  } else {
    res.json({ loggedIn: false });
  }
});

// LOGOUT
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Logout failed" });
    }
    res.clearCookie("connect.sid", { path: "/" });
    res.status(200).json({ message: "Logged out successfully" });
  });
});

//  PROFILE (GET & UPDATE)
app.get("/profile", isAuthenticated, asyncHandler(async (req, res) => {
  try {
    console.log("Session user in profile:", req.session.user); // Debug log

    if (req.session.user.userType !== 0) {
      return res.status(403).json({ error: "Access denied" });
    }

    const result = await pool.query(
      "SELECT name, email, profile_picture FROM users WHERE user_id = $1 AND usertype = 0",
      [req.session.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("User profile error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}));


// ADMIN PROFILE (GET & UPDATE)
app.get(
  "/admin/profile",
  isAuthenticated,
  asyncHandler(async (req, res) => {
    try {
      const result = await pool.query(
        "SELECT name, email, profile_picture FROM users WHERE user_id = $1 AND usertype = 1",
        [req.session.user.id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Admin not found" });
      }

      res.json(result.rows[0]);
    } catch (error) {
      console.error("Admin profile error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

app.put(
  "/admin/profile",
  isAuthenticated,
  asyncHandler(async (req, res) => {
    try {
      const { name, email } = req.body;
      await pool.query(
        "UPDATE users SET name = $1, email = $2 WHERE user_id = $3 AND usertype = 1",
        [name, email, req.session.user.id]
      );

      res.json({ message: "Profile updated successfully" });
    } catch (error) {
      console.error("Admin profile update error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

// Update Profile Picture
app.post(
  "/update-profile-picture",
  isAuthenticated,
  upload.single("profilePicture"),
  asyncHandler(async (req, res) => {
    try {
      const profilePic = req.file ? req.file.buffer : null;
      await pool.query(
        "UPDATE users SET profile_picture = $1 WHERE user_id = $2",
        [profilePic, req.session.user.id]
      );
      res.json({ profilePic: `data:image/jpeg;base64,${profilePic.toString('base64')}` });
    } catch (error) {
      console.error("Profile picture update error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

// Update Password
app.post(
  "/update-password",
  isAuthenticated,
  asyncHandler(async (req, res) => {
    try {
      const { newPassword } = req.body;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
      await pool.query(
        "UPDATE users SET password = $1 WHERE user_id = $2",
        [hashedPassword, req.session.user.id]
      );
      res.json({ message: "Password updated successfully" });
    } catch (error) {
      console.error("Password update error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);


// Submit Scam Report (with automatic user ID fetching)
app.post(
  "/scam-reports",
  upload.single("proof"),
  isAuthenticated, // Ensure user is logged in
  asyncHandler(async (req, res) => {
    try {
      const user_id = req.session.user.id; // Fetch user ID from session
      const { scam_type, description, scam_date } = req.body;

      if (!scam_type || !description || !scam_date) {
        return res.status(400).json({ error: "All fields are required" });
      }

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

// Fetch Scam Reports for Logged-in User
app.get(
  "/scam-reports",
  asyncHandler(async (req, res) => {
    try {
      if (!req.user || !req.user.id) {
        return res.status(401).json({ error: "Unauthorized: Please log in" });
      }

      const userId = req.user.id; // Ensure req.user contains the authenticated user's ID
      const result = await pool.query("SELECT * FROM scam_reports WHERE user_id = $1", [userId]);

      res.status(200).json(result.rows);
    } catch (error) {
      console.error("Error retrieving scam reports:", error);
      res.status(500).json({ error: "Error retrieving scam reports" });
    }
  })
);


app.get("/api/users/registration-stats", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT DATE(created_at) AS date, COUNT(*) AS count 
      FROM users 
      GROUP BY DATE(created_at) 
      ORDER BY date;
    `);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching registration stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/users/scam-reports", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT report_id, user_id, scam_type, description, scam_date, report_status, submitted_at 
      FROM scam_reports
      ORDER BY submitted_at DESC;
    `);
    
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching scam reports:", error);
    res.status(500).json({ message: "Server Error", error });
  }
});

app.get("/api/users/active-sessions", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT COUNT(*) AS activeSessions FROM session WHERE expire > NOW()"
    );
    res.json({
      activeSessions: parseInt(result.rows[0].activesessions, 10), // Just returning count
    });
  } catch (err) {
    console.error("Error fetching active sessions:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all scam reports from the "submitted_scam_reports" view
app.get("/api/scam-reports", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM submitted_scam_reports");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching scam reports:", error);
    res.status(500).json({ error: "Error fetching scam reports" });
  }
});

// Update scam report status
app.put("/admin-approval/:report_id", async (req, res) => {
  const { report_id } = req.params;
  const { report_status } = req.body;

  if (!report_status) {
    return res.status(400).json({ error: "report_status is required" });
  }

  try {
    const result = await pool.query(
      "UPDATE scam_reports SET report_status = $1 WHERE report_id = $2 RETURNING *",
      [report_status, report_id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Report not found" });
    }

    res.json({ message: "Report updated successfully", report: result.rows[0] });
  } catch (error) {
    console.error("Error updating report:", error);
    res.status(500).json({ error: "Error updating report" });
  }
});

app.get("/profile", isAuthenticated, asyncHandler(async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT name, email, profile_picture FROM users WHERE user_id = $1 AND usertype = 0",
      [req.session.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("User profile error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}));

// app.post("/resolve-report", isAuthenticated, asyncHandler(async (req, res) => {
//   try {
//     await pool.query("UPDATE users SET report_status = 'Cancelled' WHERE user_id = $1", [req.session.user.id]);
//     res.json({ message: "Report status updated to Cancelled" });
//   } catch (error) {
//     console.error("Resolve report error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }));




// Start the server
app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});