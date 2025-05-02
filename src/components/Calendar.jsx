import * as React from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Box } from '@mui/material';

export default function Calendar({ onDateSelect, selectedDate }) {
  const [value, setValue] = React.useState(selectedDate ? dayjs(selectedDate) : dayjs());

  const handleDateChange = (newValue) => {
    setValue(newValue);
    onDateSelect(newValue.toDate());
  };

  return (
    <Box sx={{ width: 320, mx: 'auto', mt: 4 }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar 
          value={value} 
          onChange={handleDateChange} 
        />
      </LocalizationProvider>
    </Box>
  );
}