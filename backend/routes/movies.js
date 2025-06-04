// routes/movies.js
const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  const query = "SELECT * FROM movies";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching movies:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results); // send movie list
  });
});

// 1. Get shows for a movie
router.get("/:movieId/shows", (req, res) => {
  const { movieId } = req.params;
  const query = `
    SELECT shows.id as show_id, shows.start_time, theatres.name as theatre, screens.name as screen
    FROM shows
    JOIN screens ON shows.screen_id = screens.id
    JOIN theatres ON screens.theatre_id = theatres.id
  `;
  db.query(query, (err, results) => {
    if (err) {
        console.log(err)
        return res.status(500).json({ error: "DB error" });
    }
    res.json(results);
  });
});

module.exports = router;
