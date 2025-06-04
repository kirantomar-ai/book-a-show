// server.js
const express = require("express");
const path = require('path');
const cors = require("cors");
const db = require("./db");
const movieRoutes = require("./routes/movies");
const authRoutes = require("./routes/auth");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'frontend1', 'build')));

app.use("/api/movies", movieRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/bookings", require("./routes/bookings"));
app.use("/api/shows", require("./routes/shows"));
app.use("/api/cities", require("./routes/cities"));

// // Catch-all to serve React's index.html for any other route
app.use(['/', '/book', '/movies', '/my-bookings'], (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, '..', 'frontend1', 'build', 'index.html'));
  } else {
    res.status(404).json({ error: 'API route not found' });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
