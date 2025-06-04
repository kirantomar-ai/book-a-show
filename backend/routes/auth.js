const express = require("express");
const router = express.Router();
const db = require("../db"); // should be mysql2/promise pool
const jwt = require("jsonwebtoken");

// Common password for all users (temporary)
const COMMON_PASSWORD = "pass123";

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Email and password required" });

  try {
    const [results] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    console.log(`SELECT * FROM users WHERE email = ${email}`)
    if (results.length === 0)
      return res.status(401).json({ error: "User not found" });

    const user = results[0];

    if (password !== COMMON_PASSWORD)
      return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      "my_super_secret_key",
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Database error" });
  }
});


// Get user by token (for auto-login)
router.get("/me", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "my_super_secret_key");
    const [results] = await db.query("SELECT * FROM users WHERE id = ?", [decoded.id]);

    if (results.length === 0) return res.status(404).json({ error: "User not found" });

    const user = results[0];
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    console.error("Auth check error:", err);
    res.status(401).json({ error: "Invalid or expired token" });
  }
});

module.exports = router;
