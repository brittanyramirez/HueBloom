import express from "express";
import pool from "../db.js";

const router = express.Router();

// SAVE MOOD ENTRY
// this saves a new mood entry to the database
router.post("/save", async (req, res) => {
  try {
    const {
      userId,
      moodText,
      selectedMood,
      reflectionText,
      palette,
      shareWithPartner,
    } = req.body;

    if (!userId || !moodText) {
      return res.status(400).json({
        message: "User ID and mood text are required",
      });
    }

    await pool.query(
      `INSERT INTO mood_entries 
      (user_id, mood_text, selected_mood, reflection_text, palette_json, share_with_partner)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        userId,
        moodText,
        selectedMood || null,
        reflectionText || null,
        palette ? JSON.stringify(palette) : null,
        shareWithPartner || false,
      ]
    );

    res.status(201).json({
      message: "Mood entry saved successfully",
    });
  } catch (error) {
    console.error("Save mood entry error:", error);
    res.status(500).json({
      message: "Server error while saving mood entry",
    });
  }
});

// GET MOOD HISTORY
// this gets all mood entries for one user ordered from newest to oldest
router.get("/history/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const [rows] = await pool.query(
      `SELECT * FROM mood_entries
       WHERE user_id = ?
       ORDER BY created_at DESC`,
      [userId]
    );

    res.json(rows);
  } catch (error) {
    console.error("Get mood history error:", error);
    res.status(500).json({
      message: "Server error while fetching mood history",
    });
  }
});

// GET GARDEN ENTRIES
// this gets the mood entries used in the emotion garden
router.get("/garden/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const [rows] = await pool.query(
      `SELECT id, user_id, mood_text, selected_mood, reflection_text, share_with_partner, created_at
       FROM mood_entries
       WHERE user_id = ?
       ORDER BY created_at DESC`,
      [userId]
    );

    res.json(rows);
  } catch (error) {
    console.error("Get garden entries error:", error);
    res.status(500).json({
      message: "Server error while fetching garden entries",
    });
  }
});

// GET SHARED ENTRIES FOR SUPPORT PARTNER
// this gets only the mood entries the user chose to share
router.get("/shared/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const [rows] = await pool.query(
      `SELECT id, user_id, mood_text, selected_mood, reflection_text, share_with_partner, created_at
       FROM mood_entries
       WHERE user_id = ? AND share_with_partner = true
       ORDER BY created_at DESC`,
      [userId]
    );

    res.json(rows);
  } catch (error) {
    console.error("Get shared entries error:", error);
    res.status(500).json({
      message: "Server error while fetching shared entries",
    });
  }
});
// SAVE SUPPORT MESSAGE
router.post("/support", async (req, res) => {
  try {
    console.log("Incoming support data:", req.body);

    const { partnerId, userId, tone, message } = req.body;

    if (!partnerId || !userId || !message) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const [result] = await pool.query(
      `INSERT INTO support_messages (partner_id, user_id, tone, message)
       VALUES (?, ?, ?, ?)`,
      [partnerId, userId, tone || null, message]
    );

    console.log("Insert result:", result);

    res.status(201).json({
      message: "Support message sent successfully",
    });
  } catch (error) {
    console.error("Save support message error:", error);
    res.status(500).json({
      message: "Server error while sending support message",
    });
  }
});
// this gets support messages for one user ordered from newest to oldest
router.get("/support-messages/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const [rows] = await pool.query(
      `SELECT id, partner_id, user_id, tone, message, created_at
       FROM support_messages
       WHERE user_id = ?
       ORDER BY created_at DESC`,
      [userId]
    );

    res.json(rows);
  } catch (error) {
    console.error("Get support messages error:", error);
    res.status(500).json({
      message: "Server error while fetching support messages",
    });
  }
});
// GET CONNECTED USER FOR SUPPORT PARTNER
// this finds the main user connected to the logged in support partner by email
router.get("/connected-user/:partnerEmail", async (req, res) => {
  try {
    const { partnerEmail } = req.params;

    const [rows] = await pool.query(
      `SELECT id, full_name, email, support_partner_email
       FROM users
       WHERE support_partner_email = ? AND role = 'user'
       LIMIT 1`,
      [partnerEmail]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "No connected user found for this support partner",
      });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Get connected user error:", error);
    res.status(500).json({
      message: "Server error while finding connected user",
    });
  }
});
export default router;