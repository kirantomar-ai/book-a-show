const express = require("express");
const router = express.Router();
const db = require("../db"); // make sure this is mysql2/promise connection

// Get all shows (all shows are valid for any TMDB movie)
router.get("/movie/:tmdbId", async (req, res) => {
  try {
    const [shows] = await db.query(
      `SELECT s.id, s.show_time, s.screen_number, s.price, 
              t.name AS theatre_name, t.address, c.name AS city_name
       FROM shows s
       JOIN theatres t ON s.theatre_id = t.id
       JOIN cities c ON t.city_id = c.id 
       WHERE s.id < 100 
       ORDER BY s.show_time ASC`
    );

    res.json(shows);
  } catch (err) {
    console.error("Error fetching shows:", err);
    res.status(500).json({ error: "Failed to fetch shows" });
  }
});

// Get seat layout for a show
router.get("/:showId/seats", async (req, res) => {
  const { showId } = req.params;

  try {
    const [seats] = await db.query(
      `SELECT id, seat_number, is_booked 
       FROM seats 
       WHERE show_id = ? 
       ORDER BY seat_number`,
      [showId]
    );
    console.log(`SELECT id, seat_number, is_booked 
       FROM seats 
       WHERE show_id = ${showId} 
       ORDER BY seat_number`)
    res.json(seats);
  } catch (err) {
    console.error("Error fetching seats:", err);
    res.status(500).json({ error: "Failed to fetch seats" });
  }
});

module.exports = router;
