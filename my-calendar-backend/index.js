require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

db.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Successfully connected to database');
    connection.release();
  }
});

app.get('/', (req, res) => {
  return res.json("From Backend side");
});

app.get('/events', (req, res) => {
  const sql = "SELECT * FROM events";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post('/events/create', (req, res) => {
  const { title, description, event_date, start_time, end_time, location, color } = req.body;

  const sql = "INSERT INTO events (title, description, event_date, start_time, end_time, location, color) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const values = [title, description, event_date, start_time, end_time, location, color];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting event:", err);
      return res.status(500).json({ error: err.code, message: err.sqlMessage });
    }
    
    const selectSql = "SELECT * FROM events WHERE id = ?";
    db.query(selectSql, [result.insertId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(201).json(data[0]);
    });
  });
});

app.put('/events', express.json(), (req, res) => {
  let { id, title, description, event_date, start_time, end_time, location, color } = req.body;

  const numericId = parseInt(id, 10);
  if (isNaN(numericId)) {
    return res.status(400).json({ error: 'Invalid event ID' });
  }

  const sql = `
    UPDATE events 
    SET title = ?, description = ?, event_date = ?, start_time = ?, end_time = ?, location = ?, color = ?
    WHERE id = ?
  `;

  const values = [title, description, event_date, start_time, end_time, location, color, numericId];

  console.log("Updating event with values:", values); // ✅ helpful debug log

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating event:', err);
      return res.status(500).json({ error: 'Database error', details: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Event not found or no changes made' });
    }

    // Fetch and return updated event
    db.query('SELECT * FROM events WHERE id = ?', [numericId], (err, data) => {
      if (err) {
        console.error('Error fetching updated event:', err);
        return res.status(500).json({ error: 'Database error', details: err });
      }
      return res.json(data[0]);
    });
  });
});

app.delete('/events/:id', (req, res) => {
  const eventId = req.params.id;

  const deleteQuery = 'DELETE FROM events WHERE id = ?';

  db.query(deleteQuery, [eventId], (err, result) => {
    if (err) {
      console.error('Error deleting event:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.status(200).json({ message: 'Event deleted successfully' });
  });
});


app.listen(8081, () => {
  console.log("listening on port 8081");
});