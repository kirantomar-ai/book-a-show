// server.js
const express = require("express");
const cors = require("cors");
const db = require("./db");
const movieRoutes = require("./routes/movies");
const authRoutes = require("./routes/auth");
const bookingRoutes = require("./routes/bookings");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/movies", movieRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/bookings", require("./routes/bookings"));
app.use("/api/shows", require("./routes/shows"));
app.use("/api/cities", require("./routes/cities"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
