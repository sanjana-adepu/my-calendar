import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  IconButton
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import dayjs from "dayjs";

export default function EventDetails({ event, handleClose, onEventUpdated }) {
  const [editMode, setEditMode] = useState(false);
  const [editedEvent, setEditedEvent] = useState({ ...event });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setEditedEvent({ 
      ...event, 
      event_date: dayjs(event.event_date?.split("T")[0]).add(1, 'day').format("YYYY-MM-DD") || '' 
    });
    setEditMode(false);
  }, [event]);

  if (!event) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const { data: updatedEvent } = await axios.put('http://localhost:8081/events', {
        ...editedEvent,
        event_date: editedEvent.event_date?.split("T")[0] || '',
      });
      onEventUpdated(updatedEvent);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating event:', error);
      alert('Error updating event');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8081/events/${event.id}`);
      onEventUpdated(null);
      handleClose();
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Error deleting event');
    }
  };

  return (
    <Dialog open={!!event} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {editMode ? "Edit Event" : "Event Details"}
          <Box>
            {!editMode && (
              <>
                <IconButton onClick={() => setEditMode(true)} title="Edit">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={handleDelete} title="Delete">
                  <DeleteIcon style={{ color: 'red' }} />
                </IconButton>
              </>
            )}
            <IconButton onClick={handleClose} title="Close">
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
        {editMode ? (
          <>
            <TextField label="ID" name="id" value={editedEvent.id || ''} disabled />
            <TextField label="Title" name="title" value={editedEvent.title || ''} onChange={handleChange} />
            <TextField
              label="Description"
              name="description"
              value={editedEvent.description || ''}
              onChange={handleChange}
              multiline
              rows={4}
            />
            <TextField
              label="Event Date"
              name="event_date"
              type="date"
              value={editedEvent.event_date || ''}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
            <TextField label="Start Time" name="start_time" value={editedEvent.start_time || ''} onChange={handleChange} />
            <TextField label="End Time" name="end_time" value={editedEvent.end_time || ''} onChange={handleChange} />
            <TextField label="Location" name="location" value={editedEvent.location || ''} onChange={handleChange} />
            <TextField
              label="Color"
              name="color"
              type="color"
              value={editedEvent.color || '#1976d2'}
              onChange={handleChange}
            />
          </>
        ) : (
          <>
            <Typography variant="h6">{event.title}</Typography>
            <Typography color="textSecondary">{event.description}</Typography>
            <Box mt={2}>
              <Typography><strong>Date:</strong> {event.event_date}</Typography>
              <Typography><strong>Time:</strong> {event.start_time} - {event.end_time}</Typography>
              <Typography><strong>Location:</strong> {event.location}</Typography>
            </Box>
            <Box width={50} height={50} bgcolor={event.color || '#1976d2'} mt={2} />
          </>
        )}
      </DialogContent>
      <DialogActions>
        {editMode && (
          <>
            <Button onClick={() => setEditMode(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              startIcon={<SaveIcon />}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}
