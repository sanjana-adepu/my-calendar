import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, IconButton, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TouchAppRoundedIcon from "@mui/icons-material/TouchAppRounded";
import AddEvent from "./AddEvent";
import EventDetails from "./EventDetails";
import axios from "axios";
import dayjs from "dayjs";

const timeSlots = Array.from({ length: 16 }, (_, i) => `${i + 6}:00`);

export default function Schedule({ selectedDate }) {
  const [open, setOpen] = useState(false);
  const [schedule, setSchedule] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const eventDate = selectedDate ? dayjs(selectedDate).format("YYYY-MM-DD") : dayjs().format("YYYY-MM-DD");

  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    event_date: eventDate,
    start_time: "",
    end_time: "",
    location: "",
    color: "#90caf9",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (e) => setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  const handleViewEvent = (event) => setSelectedEvent(event);
  const handleCloseEventDetails = () => setSelectedEvent(null);

  const filterEventsByDate = (events, date) => {
    const formatted = dayjs(date).format("YYYY-MM-DD");
    return events.filter(event => dayjs(event.event_date).format("YYYY-MM-DD") === formatted);
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:8081/events');
      if (Array.isArray(response.data)) {
        setSchedule(response.data);
        setFilteredEvents(filterEventsByDate(response.data, selectedDate));
      } else {
        setSchedule([]);
        setFilteredEvents([]);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      setSchedule([]);
      setFilteredEvents([]);
    }
  };

  const handleEventUpdated = (updatedEvent, deletedId = null) => {
    if (updatedEvent === null && deletedId !== null) {
      setSchedule(prev => {
        const newSchedule = prev.filter(event => event.id !== deletedId);
        setFilteredEvents(filterEventsByDate(newSchedule, selectedDate));
        return newSchedule;
      });
    } else if (updatedEvent) {
      setSchedule(prev => {
        const newSchedule = prev.map(event =>
          event.id === updatedEvent.id ? updatedEvent : event
        );
        setFilteredEvents(filterEventsByDate(newSchedule, selectedDate));
        return newSchedule;
      });
    }
  };  

  const handleSubmit = async () => {
    try {
      const { id, ...eventWithoutId } = newEvent;

      const response = await axios.post("http://localhost:8081/events/create", eventWithoutId);
      const createdEvent = response.data;

      setSchedule(prev => {
        const updated = [...prev, createdEvent];
        setFilteredEvents(filterEventsByDate(updated, selectedDate));
        return updated;
      });

      setNewEvent({
        title: "",
        description: "",
        event_date: eventDate,
        start_time: "",
        end_time: "",
        location: "",
        color: "#90caf9",
      });

      handleClose();
    } catch (error) {
      console.error("Failed to create event:", error.response?.data || error.message);
      alert(`Creation failed: ${error.response?.data?.message || error.message}`);
    }
  };

  const convertTimeToIndex = (time) => {
    if (!time) return 0;
    const hour = parseInt(time.split(":")[0], 10);
    return hour - 6;
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (schedule.length > 0) {
      setFilteredEvents(filterEventsByDate(schedule, selectedDate));
    }
  }, [selectedDate, schedule]);

  return (
    <Box sx={{ position: "relative", height: "100%" }}>
      {timeSlots.map((slot, index) => (
        <Box
          key={slot}
          sx={{
            borderBottom: "1px solid #eee",
            height: "60px",
            display: "flex",
            alignItems: "center",
            px: 1,
            bgcolor: "transparent",
          }}
        >
          <Typography variant="caption" sx={{ width: "60px", color: "#999" }}>
            {slot}
          </Typography>
        </Box>
      ))}

      {filteredEvents.map((event, i) => {
        const start = event.start_time;
        const end = event.end_time;
        const topOffset = convertTimeToIndex(start) * 60;
        const height = 60 * (parseInt(end) - parseInt(start));

        return (
          <Paper
            key={i}
            sx={{
              position: "absolute",
              top: topOffset + 8,
              left: "80px",
              right: "16px",
              height: `${height}px`,
              bgcolor: event.color,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 2,
              borderRadius: 2,
              boxShadow: 2,
            }}
          >
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {event.title}
              </Typography>
              <Typography variant="caption">
                {start} - {end} | {event.location}
              </Typography>
            </Box>
            <IconButton onClick={() => handleViewEvent(event)}>
              <TouchAppRoundedIcon />
            </IconButton>
          </Paper>
        );
      })}

      <Fab
        color="primary"
        aria-label="add"
        onClick={handleOpen}
        sx={{ position: "fixed", bottom: 24, right: 24 }}
      >
        <AddIcon />
      </Fab>

      <AddEvent
        open={open}
        handleClose={handleClose}
        newEvent={newEvent}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

      {selectedEvent && (
        <Box sx={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", bgcolor: "rgba(0,0,0,0.5)", zIndex: 1300 }}>
          <EventDetails 
            event={selectedEvent} 
            handleClose={handleCloseEventDetails}
            onEventUpdated={handleEventUpdated}
          />
        </Box>
      )}
    </Box>
  );
}
