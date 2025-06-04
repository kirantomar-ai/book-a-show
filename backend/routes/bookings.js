const express = require("express");
const router = express.Router();
const db = require("../db");

// Book seats
router.post("/", async (req, res) => {
  const { user_id, show_id, seats } = req.body;

  try {
    if (!user_id || !show_id || !seats || !Array.isArray(seats)) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const [showResult] = await db.query("SELECT price FROM shows WHERE id = ?", [show_id]);
    if (showResult.length === 0) return res.status(404).json({ error: "Show not found" });
    console.log({showResult})
    const show = showResult[0];
    const totalAmount = show.price * seats.length;

    const [bookingResult] = await db.query(
      "INSERT INTO bookings (user_id, show_id, total_amount) VALUES (?, ?, ?)",
      [user_id, show_id, totalAmount]
    );
    const booking_id = bookingResult.insertId;

    const insertSeatPromises = seats.map(async (seat_id) => {
      await db.query("INSERT INTO booking_seats (booking_id, seat_id) VALUES (?, ?)", [booking_id, seat_id]);
      await db.query("UPDATE seats SET is_booked = 1 WHERE id = ?", [seat_id]);
    });

    await Promise.all(insertSeatPromises);

    await db.query(
      "INSERT INTO payments (booking_id, amount, status, payment_method) VALUES (?, ?, 'success', 'card')",
      [booking_id, totalAmount]
    );

    res.json({ message: "Booking successful", booking_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get bookings for a user with seat numbers
router.get("/user/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const [bookings] = await db.query(
      `SELECT 
          b.id AS booking_id,
          b.total_amount,
          b.booking_time,
          s.show_time,
          s.screen_number,
          s.price,
          t.name AS theatre_name,
          GROUP_CONCAT(se.seat_number ORDER BY se.seat_number SEPARATOR ', ') AS seat_numbers
        FROM bookings b
        JOIN shows s ON b.show_id = s.id
        JOIN theatres t ON s.theatre_id = t.id
        JOIN booking_seats bs ON b.id = bs.booking_id
        JOIN seats se ON bs.seat_id = se.id
        WHERE b.user_id = ?
        GROUP BY b.id
        ORDER BY b.booking_time DESC`,
      [userId]
    );

    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});


module.exports = router;
