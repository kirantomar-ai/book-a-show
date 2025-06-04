const express = require("express");
const router = express.Router();
const db = require("../db"); // should be using mysql2/promise

// Get all cities
router.get("/", async (req, res) => {
  try {
    const [cities] = await db.query("SELECT * FROM cities ORDER BY name");
    res.json(cities);
  } catch (err) {
    console.error("Error fetching cities:", err);
    res.status(500).json({ error: "Failed to fetch cities" });
  }
});

// Get all theatres in a city
router.get("/:cityId/theatres", async (req, res) => {
  const { cityId } = req.params;

  try {
    const [theatres] = await db.query(
      "SELECT id, name, address FROM theatres WHERE city_id = ?",
      [cityId]
    );
    res.json(theatres);
  } catch (err) {
    console.error("Error fetching theatres:", err);
    res.status(500).json({ error: "Failed to fetch theatres" });
  }
});

module.exports = router;
