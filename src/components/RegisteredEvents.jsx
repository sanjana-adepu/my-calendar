// RegisteredEvents.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';

export default function RegisteredEvents({ selectedDate }) {
  // This would be similar to your Schedule component but filtered for registered events
  // You might fetch registered events from your API or filter them client-side
  
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6">
        Registered Events for {selectedDate.format('MMMM D, YYYY')}
      </Typography>
      {/* Add your registered events display logic here */}
    </Box>
  );
}