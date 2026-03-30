import express from "express";
import bcrypt from "bcrypt";
import pool from "../db.js";

const router = express.Router();

// SIGNUP ROUTE
// this creates a new user account and saves it to the database
router.post("/signup", async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      role,
      supportPartnerEmail,
    } = req.body;

    // basic validation
    if (!fullName || !email || !password || !role) {
      return res.status(400).json({
        message: "Please fill in all required fields",
      });
    }

    // check if user already exists
    const [existingUser] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({
        message: "User already exists with this email",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // insert new user
    await pool.query(
      `INSERT INTO users (full_name, email, password_hash, role, support_partner_email)
       VALUES (?, ?, ?, ?, ?)`,
      [
        fullName,
        email,
        hashedPassword,
        role,
        role === "user" ? supportPartnerEmail || null : null,
      ]
    );

    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Signup error:", error);

    res.status(500).json({
      message: "Server error during signup",
    });
  }
});

// LOGIN ROUTE
// this checks user credentials and logs them in
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // basic validation
    if (!email || !password) {
      return res.status(400).json({
        message: "Please enter email and password",
      });
    }

    // find user by email
    const [users] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (users.length === 0) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const user = users[0];

    // compare password
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // SUCCESS LOGIN
    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      message: "Server error during login",
    });
  }
});

export default router;