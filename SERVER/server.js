const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

// Initialize app and middleware
const app = express();
app.use(cors());
app.use(express.json());

// Create MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // replace with your MySQL username
    password: 'sudopw', // replace with your MySQL password
    database: 'medicalDB'
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Endpoint to get the remedy based on symptoms
app.post('/transcript', (req, res) => {
    const transcriptText = req.body.transcriptText.toLowerCase().split('.')[0];

    // Query the database for the symptom
    const query = `SELECT * FROM medical_conditions WHERE symptom = ?`;

    db.query(query, [transcriptText], (err, result) => {
        if (err) {
            console.error('Error querying database:', err);
            res.status(500).send('Database error');
        } else {
            res.json(result.length > 0 ? result[0] : null);
        }
    });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
