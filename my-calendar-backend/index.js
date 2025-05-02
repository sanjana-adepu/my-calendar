require('dotenv').config();
const express = require('express');
const cors = require('cors');

const eventRoutes = require('./routes/eventRoutes');

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.get('/', (req, res) => res.json("From Backend side"));
app.use('/events', eventRoutes);

const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port localhost:${PORT}`);
});
