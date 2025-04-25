import { Grid, Paper, Box } from "@mui/material";
import Calendar from "./components/Calendar";
import EventsToday from "./components/EventsToday";
import Schedule from "./components/Schedule";

export default function App() {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        p: 2,
        bgcolor: '#BBAFAF',
        boxSizing: 'border-box',
      }}
    >
      <Grid container spacing={2}>
        <Grid item size={6} sx={{height:'100vh'}} xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Schedule />
          </Paper>
        </Grid>
        <Grid container size={6} columnSpacing={2}>
          <Grid item size={12} xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <Calendar />
            </Paper>
          </Grid>
          <Grid item size={12} xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <EventsToday />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
