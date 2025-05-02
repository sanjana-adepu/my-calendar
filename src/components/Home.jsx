import React, { useState } from 'react';
import { Box, Paper, Grid,  Typography, Stack} from '@mui/material';
import { styled } from '@mui/material/styles';
import Calendar from './Calendar';
import Schedule from './Schedule';
import EventsToday from './EventsToday';
import SearchBar from './SearchBar';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import Registered from './Registered';
import dayjs from 'dayjs';
import RegisteredEvents from './RegisteredEvents';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  padding: theme.spacing(1),
  textAlign: 'center',
}));

export default function Home() {
  const [selectedValue, setSelectedValue] = useState('b'); 
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const handleRadioChange = (event) => {
    const newValue = event.target.checked ? 'a' : 'b';
    setSelectedValue(newValue);
    console.log(newValue === 'a' ? "Registered events only selected" : "All events selected");
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  return (
    <Box
      sx={{
        width: '100vw',
        minHeight: '100vh',
        bgcolor: '#F8F8F8',
        boxSizing: 'border-box',
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1} mb={2}>
        <ArrowBackIosNewRoundedIcon sx={{ color: 'black' }} />
        <Typography variant="h5" color="black">Calendar</Typography>
      </Stack>

      <Grid container spacing={2} mb={2}>
        <Grid size={4}></Grid>
        <Grid size={4}>
          <Item>
            <SearchBar/>
          </Item>
        </Grid>
        <Grid size={3}>
          <Item>
            <Registered selectedValue={selectedValue} onRadioChange={handleRadioChange} />
          </Item>
        </Grid>
        <Grid size={1}>
          <Item>
            <Stack direction="row" alignItems="center" spacing={1}>
              <SettingsRoundedIcon />
              <Typography>Options</Typography>
            </Stack>
          </Item>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid size={8}>
          <Paper>
            {selectedValue === 'a' ? (
                <RegisteredEvents selectedDate={selectedDate} />
              ) : (
                <Schedule selectedDate={selectedDate} />
              )}
          </Paper>
        </Grid>
        <Grid size={4}>
          <Grid container spacing={3}>
            <Grid size={12}>
              <Paper sx={{ p: 3 }}>
               <Calendar onDateSelect={handleDateSelect} selectedDate={selectedDate} />
              </Paper>
            </Grid>
            <Grid size={12}>
              <Paper sx={{ p: 3 }}>
                <EventsToday />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
