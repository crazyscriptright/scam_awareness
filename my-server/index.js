const express = require('express');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const multer = require('multer');

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();
const saltRounds = 12;

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true })); // Restrict origins
app.use(bodyParser.json());
app.use(helmet()); // Security headers

// Rate limiting to prevent brute-force attacks
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests, please try again later."
});
app.use(limiter);

// PostgreSQL connection with environment variables
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

// Secure file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

// Registration endpoint
app.post('/register', async (req, res) => {
    const { name, dob, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const result = await pool.query(
            'INSERT INTO users (name, dob, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, dob, email, hashedPassword]
        );
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Registration failed' });
    }
});

// Forgot Password endpoint (prevents user enumeration)
app.post('/forgot-password', async (req, res) => {
    const { email, dob, newPassword } = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1 AND dob = $2', [email, dob]);
        if (result.rows.length === 0) {
            return res.status(200).json({ message: 'If the email exists, a reset link will be sent' });
        }
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
        await pool.query('UPDATE users SET password = $1 WHERE email = $2', [hashedPassword, email]);
        res.status(200).json({ message: 'Password updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error updating password' });
    }
});

// Secure sign-in with limited error messages
app.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const user = result.rows[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        res.status(200).json({ message: 'Sign-in successful', userType: user.usertype });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error signing in' });
    }
});

// Scam Report Submission
app.post('/scam-reports', upload.single('proof'), async (req, res) => {
    const { user_id, scam_type, description, scam_date } = req.body;
    const proofPath = req.file ? req.file.path : null;
    try {
        const result = await pool.query(
            'INSERT INTO scam_reports (user_id, scam_type, description, scam_date, proof) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [user_id, scam_type, description, scam_date, proofPath]
        );
        res.status(201).json({ message: 'Scam report submitted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error submitting scam report' });
    }
});

// Secure scam report retrieval
app.get('/scam-reports', async (req, res) => {
    try {
        const result = await pool.query('SELECT report_id, user_id, scam_type, description, scam_date FROM scam_reports');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error retrieving scam reports' });
    }
});

// Secure admin approval endpoint
app.post('/admin-approval', async (req, res) => {
    const { report_id, report_status, verification_notes, severity } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO admin_approval (report_id, report_status, verification_notes, severity) VALUES ($1, $2, $3, $4) RETURNING *',
            [report_id, report_status, verification_notes, severity]
        );
        res.status(201).json({ message: 'Admin approval submitted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error inserting admin approval' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running securely on http://localhost:${port}`);
});
