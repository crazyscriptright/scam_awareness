// Filename: index.js

const express = require('express');
const fs = require('fs');
const path = require('path');
// const multer = require('multer');
const { Pool } = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');

const port = 5000;
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// PostgreSQL connection
const pool = new Pool({
    user: 'postgres', // replace with your PostgreSQL username
    host: 'localhost',
    database: 'Scam_Awareness', // replace with your database name
    password: 'Panusanu9@', // replace with your PostgreSQL password
    port: 5434,
});

// ##########################

// Registration endpoint
app.post('/register', async (req, res) => {
    const { name, dob, email, password } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO users (name, dob, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, dob, email, password]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'User  already exists or other error' });
    }
});

// Forgot Password endpoint
app.post('/forgot-password', async (req, res) => {
    const { email, dob, newPassword } = req.body;

    try {
        // Check if the user exists with the provided email and dob
        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1 AND dob = $2',
            [email, dob]
        );

        if (result.rows.length > 0) {
            // User found, proceed to update the password
            await pool.query(
                'UPDATE users SET password = $1 WHERE email = $2',
                [newPassword, email]
            );

            res.status(200).json({ message: 'Password updated successfully' });
        } else {
            res.status(404).json({ error: 'User  not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error updating password' });
    }
});

// Sign-in endpoint
app.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1 AND password = $2',
            [email, password]
        );
        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error signing in' });
    }
});


// #################################
// Endpoint to create a scam report
app.post('/scam-reports', async (req, res) => {
    const { user_id, scam_type, description, scam_date, proofFilePath } = req.body;

    // Check if proofFilePath is provided
    if (!proofFilePath) {
        return res.status(400).send('proofFilePath is required');
    }

    // Read the file as binary data
    let proofData;
    try {
        proofData = fs.readFileSync(proofFilePath); // Read the file as binary
    } catch (err) {
        console.error('Error reading file:', err);
        return res.status(500).send('Error reading file');
    }

    const query = `
        INSERT INTO scam_reports (user_id, scam_type, description, scam_date, proof)
        VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    
    const values = [user_id, scam_type, description, scam_date, proofData];

    try {
        const result = await pool.query(query, values);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error inserting scam reports:', err);
        res.status(500).send('Error inserting scam report');
    }
});

//to cancel the report 
app.put('/scam-reports/cancel/:report_id', async (req, res) => {
    const { report_id } = req.params;
    const { description } = req.body;

    // Validate input
    if (!description) {
        return res.status(400).json({ error: 'Description is required to cancel the report' });
    }

    const query = `
        UPDATE scam_reports
        SET description = $1, report_status = 'Cancelled', last_modified = CURRENT_TIMESTAMP
        WHERE report_id = $2 RETURNING *`;

    const values = [description, report_id];

    try {
        const result = await pool.query(query, values);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Scam report not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error('Error cancelling scam report:', err);
        res.status(500).json({ error: 'Error cancelling scam report' });
    }
});

// Endpoint to fetch all scam reports
app.get('/scam-reports', async (req, res) => {
    const query = 'SELECT * FROM scam_reports';

    try {
        const result = await pool.query(query);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error retrieving scam reports:', err);
        res.status(500).send('Error retrieving scam reports');
    }
});

// ######################


// Endpoint to submit contact
app.post('/submit-contact', async (req, res) => {
    const { user_id, message } = req.body;
    const attachment = req.body.attachment || null; // Get the file path, default to null if not provided

    // Validate input
    if (!user_id || !message) {
        return res.status(400).json({ error: 'user_id and message are required' });
    }

    let attach = null;
    if (attachment) {
        try {
            attach = fs.readFileSync(attachment); // Read the file as binary
        } catch (err) {
            console.error('Error reading file:', err);
            return res.status(500).send('Error reading file');
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

        res.status(201).json({ message: 'Contact submitted successfully', contactId });
    } catch (error) {
        console.error('Error submitting contact:', error);
        res.status(500).json({ error: 'An error occurred while submitting the contact' });
    }
});



// ###########################

// Endpoint to create an admin approval
app.post('/admin-approval', async (req, res) => {
    const { report_id, report_status, verification_notes, severity } = req.body;

    // Validate input
    if (!report_id || !report_status || !severity) {
        return res.status(400).json({ error: 'report_id, report_status, and severity are required' });
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
        console.error('Error inserting admin approval:', err);
        res.status(500).json({ error: 'Error inserting admin approval' });
    }
});



app.put('/admin-approval/:verification_id', async (req, res) => {
    const { verification_id } = req.params;
    const { report_status, verification_notes, severity } = req.body;

    // Validate that verification_id is provided
    if (!verification_id) {
        return res.status(400).json({ error: 'verification_id is required' });
    }

    // Build the dynamic query and values
    const fields = [];
    const values = [];
    let query = 'UPDATE admin_approval SET ';

    if (report_status) {
        fields.push('report_status = $' + (fields.length + 1));
        values.push(report_status);
    }
    if (verification_notes) {
        fields.push('verification_notes = $' + (fields.length + 1));
        values.push(verification_notes);
    }
    if (severity) {
        fields.push('severity = $' + (fields.length + 1));
        values.push(severity);
    }

    // If no fields to update, return error
    if (fields.length === 0) {
        return res.status(400).json({ error: 'No fields provided to update' });
    }

    // Add the WHERE clause to filter by verification_id
    query += fields.join(', ') + ' WHERE verification_id = $' + (fields.length + 1) + ' RETURNING *';
    values.push(verification_id);

    try {
        const result = await pool.query(query, values);

        // If no rows are affected, the verification_id does not exist
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'No admin approval found with the provided verification_id' });
        }

        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error('Error updating admin approval:', err);
        res.status(500).json({ error: 'Error updating admin approval' });
    }
});


// Endpoint to user submitted_scam_reports details
app.get('/submitted_scam_reports', async (req, res) => {
    const query = `
        SELECT * FROM submitted_scam_reports
    `;

    try {
        const result = await pool.query(query);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching scam report details:', err);
        res.status(500).json({ error: 'Error fetching scam report details' });
    }
});



// #############################

app.post('/external_resources', async (req, res) => {
    const { verification_id, report_status, external_notes } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO external_resources (verification_id, report_status, external_notes)
             VALUES ($1, $2, $3) RETURNING *`,
            [verification_id, report_status, external_notes]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error inserting resource:', err);
        res.status(500).json({ error: 'Error inserting resource' });
    }
});


// Endpoint to get scam report details
app.get('/scam-report-details', async (req, res) => {
    const query = `
        SELECT * FROM scam_report_details
    `;

    try {
        const result = await pool.query(query);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching scam report details:', err);
        res.status(500).json({ error: 'Error fetching scam report details' });
    }
});


// ###############################

// Endpoint to create a new quiz
app.post('/quizzes', async (req, res) => {
    const { q1, q2, q3, answer } = req.body;

    // Validate input
    if (!q1 || !answer) {
        return res.status(400).json({ error: 'q1 and answer are required' });
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
        console.error('Error inserting quiz:', err);
        res.status(500).json({ error: 'Error inserting quiz' });
    }
});



// #####################3

// Endpoint to create a new news alert with optional alert_date
app.post('/news-alerts', async (req, res) => {
    const { title, description, imagePath, alertDate } = req.body; // Get alertDate from request body

    // Validate input
    if (!title || !description || !imagePath) {
        return res.status(400).json({ error: 'Title, description, and image path are required' });
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
        console.error('Error inserting news alert:', err);
        res.status(500).json({ error: 'Error inserting news alert' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});