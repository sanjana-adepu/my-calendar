const db = require('../config/db');

exports.getAllEvents = (req, res) => {
  const sql = "SELECT * FROM events";
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
};

exports.createEvent = (req, res) => {
  const { title, description, event_date, start_time, end_time, location, color } = req.body;
  const sql = `INSERT INTO events 
    (title, description, event_date, start_time, end_time, location, color) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const values = [title, description, event_date, start_time, end_time, location, color];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.code, message: err.sqlMessage });

    db.query("SELECT * FROM events WHERE id = ?", [result.insertId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(201).json(data[0]);
    });
  });
};

exports.updateEvent = (req, res) => {
  const { id, title, description, event_date, start_time, end_time, location, color } = req.body;
  const numericId = parseInt(id, 10);
  if (isNaN(numericId)) {
    return res.status(400).json({ error: 'Invalid event ID' });
  }

  const sql = `UPDATE events SET title=?, description=?, event_date=?, start_time=?, end_time=?, location=?, color=? WHERE id=?`;
  const values = [title, description, event_date, start_time, end_time, location, color, numericId];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error', details: err });

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Event not found or no changes made' });
    }

    db.query("SELECT * FROM events WHERE id = ?", [numericId], (err, data) => {
      if (err) return res.status(500).json({ error: 'Database error', details: err });
      return res.json(data[0]);
    });
  });
};

exports.deleteEvent = (req, res) => {
  const eventId = req.params.id;

  db.query("DELETE FROM events WHERE id = ?", [eventId], (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.status(200).json({ message: 'Event deleted successfully' });
  });
};
