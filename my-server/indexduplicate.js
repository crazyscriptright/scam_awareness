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

const failedAttempts = {}; // { email: { count: 0, lastAttempt: Date } }

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
app.use(bodyParser.json({ limit: "15mb" })); // Adjust if needed
app.use(bodyParser.urlencoded({ limit: "15mb", extended: true }));
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



// Auto logout after inactivity
app.use((req, res, next) => {
  if (req.session.user) {
    req.session.touch();
  }
  next();
});

// Multer setup (file handling, restricting to images and PDFs)
const storage = multer.memoryStorage();
const upload = multer({ storage });


// Middleware to check authentication
const isAuthenticated = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "Unauthorized access" });
  }
  next();
};


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

app.get("/api/userid_fetch", (req, res) => {
  if (req.session.user) {
    res.json({ user_id: req.session.user.id });
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
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

      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
      }

      // Check if the user is temporarily blocked
      if (failedAttempts[email] && failedAttempts[email].count >= 3) {
        const timeElapsed = (Date.now() - failedAttempts[email].lastAttempt) / 1000;
        if (timeElapsed < 300) { // 5-minute block
          return res.status(403).json({ error: "Too many failed attempts. Try again later." });
        } else {
          delete failedAttempts[email]; // Reset if timeout is over
        }
      }

      // Fetch user from the database
      const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

      if (result.rows.length === 0 || !(await bcrypt.compare(password, result.rows[0].password))) {
        // Increment failed login attempts
        if (!failedAttempts[email]) {
          failedAttempts[email] = { count: 1, lastAttempt: Date.now() };
        } else {
          failedAttempts[email].count += 1;
          failedAttempts[email].lastAttempt = Date.now();
        }

        return res.status(401).json({ error: "Invalid credentials" });
      }

      const user = result.rows[0];

      // Check user status
      if (user.status === "banned") {
        return res.status(403).json({ error: "Your account is banned. Please contact the admin." });
      }

      if (user.status !== "active") {
        return res.status(403).json({ error: "Your account is not active. Please contact the admin." });
      }

      // Successful login: reset failed attempts
      delete failedAttempts[email];

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

//########Scam reports########

app.post(
  "/scam-reports",
  isAuthenticated, // Ensure user is logged in
  asyncHandler(async (req, res) => {
    try {
      const user_id = req.session.user.id;
      const { scam_type, description, scam_date, proof } = req.body;

      if (!user_id || !scam_type || !description || !scam_date || !proof) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const result = await pool.query(
        "INSERT INTO scam_reports (user_id, scam_type, description, scam_date, proof) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [user_id, scam_type, description, scam_date, proof]
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


// ###########User########## 
//  PROFILE User (GET & UPDATE)
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


//#########Admin############
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


//##########Admin Dashboard ##########

// USER REGISTRATION
//Avaible at Dashboard

// ACTIVE SESSIONS
app.get("/api/users/active-sessions", async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT COUNT(*) AS "activeSessions" FROM session WHERE expire > NOW()'
    );

    res.json({
      activeSessions: parseInt(result.rows[0].activeSessions, 10),
    });
  } catch (err) {
    console.error("Error fetching active sessions:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


// SECURITY ALERTS
app.get("/api/User/security-alerts", (req, res) => {
  const alerts = Object.keys(failedAttempts)
    .filter((email) => failedAttempts[email].count >= 3) // Show only blocked users
    .map((email) => ({
      message: `Multiple failed login attempts detected for ${email}`,
      timestamp: new Date(failedAttempts[email].lastAttempt).toLocaleString(),
    }));

  res.json(alerts.length > 0 ? alerts : [{ message: "No active security alerts" }]);
});

//charts used
// USER REGISTRATION STATS
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

// SCAM REPORTS STATS
app.get("/api/users/scam-reports", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT scam_type, report_status 
      FROM scam_reports
      ORDER BY submitted_at DESC;
    `);
    
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching scam reports:", error);
    res.status(500).json({ message: "Server Error", error });
  }
});


//###########Table############
// Fetch proof for a specific report
app.get("/api/scam-reports/:report_id/proof", async (req, res) => {
  const { report_id } = req.params;
  try {
    const result = await pool.query(
      "SELECT proof FROM scam_reports WHERE report_id = $1",
      [report_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Proof not found" });
    }

    // Return the proof as a base64-encoded string
    const proof = result.rows[0].proof;
    res.status(200).send(proof); // Send the raw base64 string
  } catch (error) {
    console.error("Error fetching proof:", error);
    res.status(500).json({ message: "Server Error", error });
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
  const { report_status, admin_comments } = req.body;

  if (!report_status) {
    return res.status(400).json({ error: "report_status is required" });
  }

  try {
    const result = await pool.query(
      "UPDATE scam_reports SET report_status = $1, admin_comments = $2 WHERE report_id = $3 RETURNING *",
      [report_status, admin_comments || null, report_id]
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

//#########Fetch all scam reports##########
// Fetch all scam reports
app.get("/api/all-scam-reports", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        report_id, 
        user_id, 
        scam_type, 
        scam_date, 
        report_status, 
        last_modified, 
        description 
      FROM scam_reports
      ORDER BY last_modified DESC;
    `);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching all scam reports:", error);
    res.status(500).json({ message: "Server Error", error });
  }
});


//##############Creating External Users##############
// Fetch all external users
app.post("/api/create_external_user", async (req, res) => {
  const { name, dob, email, password } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO users (name, dob, email, password, user_type)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, dob, email, password, 2] // user_type is set to 2
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Failed to create user", error });
  }
});

//###########Contact##########
// Fetch all contact details
app.get("/api/contacts", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        contact_id, 
        user_id, 
        message, 
        submitted_at, 
        attachment 
      FROM contacts
      ORDER BY submitted_at DESC;
    `);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ message: "Failed to fetch contacts", error });
  }
});

//###########User staus block ##########
// Update user status by email or ID
app.put("/api/users/status", async (req, res) => {
  const { identifier, status } = req.body;

  try {
    // Check if the identifier is a number (user ID) or a string (email)
    const isNumeric = !isNaN(identifier);

    const result = await pool.query(
      `UPDATE users 
       SET status = $1 
       WHERE ${isNumeric ? "user_id = $2::integer" : "email = $2"} 
       RETURNING *`,
      [status, identifier]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error updating user status:", error);
    res.status(500).json({ message: "Failed to update user status", error });
  }
});


//###########Normal user###############
// Contact Us or Feedback
// Contact Us endpoint
app.post("/api/contact", (req, res) => {
  const { message, attachment } = req.body;

  // Check if user is logged in
  if (!req.session.user.id) {
    return res.status(401).json({ error: "Unauthorized: Please log in" });
  }

  const userId = req.session.user.id; // Get user_id from session

  // Insert into database
  pool.query(
    "INSERT INTO contacts (user_id, message, attachment, submitted_at) VALUES ($1, $2, $3, $4) RETURNING *",
    [userId, message, attachment, new Date()],
    (error, result) => {
      if (error) {
        console.error("Error inserting contact:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.status(201).json(result.rows[0]);
    }
  );
});

// Fetch all contacts endpoint
// app.get("/api/contactus", async (req, res) => {
//   try {
//     const result = await pool.query("SELECT * FROM contacts ORDER BY submitted_at DESC");
//     const contacts = result.rows.map((contact) => ({
//       ...contact,
//       attachment: contact.attachment ? contact.attachment.toString("base64") : null,
//     }));
//     res.status(200).json(contacts);
//   } catch (error) {
//     console.error("Error fetching contacts:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });
app.post(
  "/contact",
  isAuthenticated,
  asyncHandler(async (req, res) => {
    try {
      const { message, attachment } = req.body;
      const user_id = req.session.user.id;

      if (!message) {
        return res.status(400).json({ error: "Message field is required" });
      }

      const result = await pool.query(
        "INSERT INTO contacts (user_id, message, attachment) VALUES ($1, $2, $3) RETURNING *",
        [user_id, message, attachment || null]
      );

      res.status(201).json({
        message: "Contact request submitted successfully",
        contact: result.rows[0],
      });
    } catch (error) {
      console.error("Contact form submission error:", error);
      res.status(500).json({ error: "Error submitting contact request" });
    }
  })
);
app.get("/api/contacts", async (req, res) => {
  try {
    const { limit = 10, offset = 0 } = req.query; // Defaults to fetching 10 records
    const result = await pool.query(
      "SELECT contact_id, user_id, message, submitted_at, encode(attachment, 'base64') as attachment FROM contacts ORDER BY submitted_at DESC LIMIT $1 OFFSET $2",
      [limit, offset]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ message: "Server Error", error });
  }
});

app.get("/download/:contact_id", async (req, res) => {
  const { contact_id } = req.params;

  try {
    const result = await pool.query(
      "SELECT attachment FROM contacts WHERE contact_id = $1",
      [contact_id]
    );

    if (result.rows.length === 0 || !result.rows[0].attachment) {
      return res.status(404).json({ message: "Attachment not found" });
    }

    const fileData = result.rows[0].attachment; // BYTEA data

    res.set({
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="attachment_${contact_id}"`,
    });

    res.send(fileData); // Send raw file data
  } catch (error) {
    console.error("Error downloading file:", error);
    res.status(500).json({ message: "Server Error", error });
  }
});


// app.post("/resolve-report", isAuthenticated, asyncHandler(async (req, res) => {
//   try {
//     await pool.query("UPDATE users SET report_status = 'Cancelled' WHERE user_id = $1", [req.session.user.id]);
//     res.json({ message: "Report status updated to Cancelled" });
//   } catch (error) {
//     console.error("Resolve report error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }));


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

// Start the server
app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});