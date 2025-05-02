// src/components/Popup.jsx

import React from "react";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";

export default function Popup({ open, handleClose, newEvent, handleChange, handleSubmit }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Event</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
        <TextField label="Title" name="title" value={newEvent.title} onChange={handleChange} />
        <TextField label="Description" name="description" value={newEvent.description} onChange={handleChange} />
        <TextField
          label="Event Date"
          name="event_date"
          type="date"
          value={newEvent.event_date}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField label="Start Time" name="start_time" value={newEvent.start_time} onChange={handleChange} placeholder="6:00" />
        <TextField label="End Time" name="end_time" value={newEvent.end_time} onChange={handleChange} placeholder="8:00" />
        <TextField label="Location" name="location" value={newEvent.location} onChange={handleChange} />
        <TextField label="Color" name="color" type="color" value={newEvent.color} onChange={handleChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
