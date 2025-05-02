const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

router.get('/', eventController.getAllEvents);
router.post('/create', eventController.createEvent);
router.put('/', eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);

module.exports = router;
