import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import axios from 'axios';
import dayjs from 'dayjs';

export default function EventsToday() {
  const [todayEvents, setTodayEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('http://localhost:8081/events');
        if (Array.isArray(res.data)) {

          const today = dayjs().format('YYYY-MM-DD');
          const filteredEvents = res.data.filter(event => 
            dayjs(event.event_date).format('YYYY-MM-DD') === today
          );
          setTodayEvents(filteredEvents);
        } else {
          console.error('Invalid data', res.data);
          setTodayEvents([]);
        }
      } catch (err) {
        console.error(err);
        setTodayEvents([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (isLoading) {
    return (
      <Box>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Events Today
        </Typography>
        <Typography variant="body2">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Events Today
      </Typography>
      {todayEvents.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No events scheduled for today
        </Typography>
      ) : (
        <List>
          {todayEvents.map((event, index) => (
            <ListItem key={index} disablePadding sx={{ mb: 1 }}>
              <ListItemIcon>
                <Box
                  sx={{
                    width: 16,
                    height: 16,
                    borderRadius: "4px",
                    backgroundColor: event.color,
                    mr: 1,
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary={event.title}
                secondary={`${event.start_time} - ${event.end_time}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}