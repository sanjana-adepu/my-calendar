const { promisePool } = require('../config/db');

const eventController = {
  getAllEvents: async (req, res) => {
    try {
      const [rows] = await promisePool.query("SELECT * FROM events");
      return res.json(rows);
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },

  // reindexEvents: async (req, res) => {
  //   const reindexSql = `
  //     SET @count = 0;
  //     UPDATE events SET id = (@count := @count + 1) ORDER BY id;
  //     ALTER TABLE events AUTO_INCREMENT = 1;
  //   `;

  //   try {
  //     await promisePool.query(reindexSql);
  //     return res.json({ message: 'Event IDs reindexed successfully' });
  //   } catch (err) {
  //     console.error('Error reindexing:', err);
  //     return res.status(500).json({ error: 'Database error', details: err });
  //   }
  // },

  createEvent: async (req, res) => {
    const { title, description, event_date, start_time, end_time, location, color } = req.body;

    try {
      const [result] = await promisePool.query(
        "INSERT INTO events (title, description, event_date, start_time, end_time, location, color) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [title, description, event_date, start_time, end_time, location, color]
      );
      
      const [data] = await promisePool.query(
        "SELECT * FROM events WHERE id = ?",
        [result.insertId]
      );
      
      return res.status(201).json(data[0]);
    } catch (err) {
      console.error("Error inserting event:", err);
      return res.status(500).json({ 
        error: err.code, 
        message: err.sqlMessage 
      });
    }
  },

  updateEvent: async (req, res) => {
    let { id, title, description, event_date, start_time, end_time, location, color } = req.body;

    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      return res.status(400).json({ error: 'Invalid event ID' });
    }

    try {
      const [result] = await promisePool.query(
        `UPDATE events 
         SET title = ?, description = ?, event_date = ?, start_time = ?, end_time = ?, location = ?, color = ?
         WHERE id = ?`,
        [title, description, event_date, start_time, end_time, location, color, numericId]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Event not found or no changes made' });
      }

      const [data] = await promisePool.query(
        'SELECT * FROM events WHERE id = ?',
        [numericId]
      );
      
      return res.json(data[0]);
    } catch (err) {
      console.error('Error updating event:', err);
      return res.status(500).json({ 
        error: 'Database error', 
        details: err 
      });
    }
  },

  deleteEvent: async (req, res) => {
    const eventId = parseInt(req.params.id, 10);

    if (isNaN(eventId)) {
      return res.status(400).json({ error: 'Invalid event ID' });
    }

    try {
      const [result] = await promisePool.query(
        "DELETE FROM events WHERE id = ?",
        [eventId]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Event not found' });
      }

      return res.json({ message: 'Event deleted successfully' });
    } catch (err) {
      console.error('Error deleting event:', err);
      return res.status(500).json({ 
        error: 'Database error', 
        details: err 
      });
    }
  }
};

module.exports = eventController;