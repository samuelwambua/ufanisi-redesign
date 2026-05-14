import { Router, Request, Response } from "express";
import pool from "../config/db";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const { fullName, email, phone, service, message } = req.body;

  if (!fullName || !email || !phone || !service || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Save to PostgreSQL
    await pool.query(
      `INSERT INTO quotes (full_name, email, phone, service, message, created_at)
       VALUES ($1, $2, $3, $4, $5, NOW())`,
      [fullName, email, phone, service, message]
    );

    return res.status(201).json({ message: "Quote request received." });
  } catch (err) {
    console.error("Quote insert error:", err);
    return res.status(500).json({ error: "Server error. Please try again." });
  }
});

export default router;