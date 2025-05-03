// RegisteredEvents.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';

export default function RegisteredEvents({ selectedDate }) {
  
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6">
        Registered Events for {selectedDate.format('MMMM D, YYYY')}
      </Typography>
    </Box>
  );
}