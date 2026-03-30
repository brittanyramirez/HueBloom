import express from "express";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// GENERATE MOOD INSIGHT
// this sends the user's mood text to Gemini and returns a mood category,
// a reflection, and a color palette in structured JSON
router.post("/generate", async (req, res) => {
  try {
    const { moodText } = req.body;

    if (!moodText || !moodText.trim()) {
      return res.status(400).json({
        message: "Mood text is required",
      });
    }

    const prompt = `
You are helping power a mental wellness app called HueBloom.

Analyze the user's mood text and return:
1. a single mood category
2. a short supportive reflection
3. a 4-color palette that matches the emotional tone

Allowed mood categories:
calm, happy, hopeful, anxious, overwhelmed, tired, sad, balanced

Return ONLY valid JSON in this exact shape:
{
  "selectedMood": "calm",
  "reflectionText": "short supportive reflection here",
  "palette": ["#000000", "#111111", "#222222", "#333333"]
}

User mood text:
"${moodText}"
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const rawText = response.text;
    const parsed = JSON.parse(rawText);

    res.json(parsed);
  } catch (error) {
    console.error("Gemini generate error:", error);
    res.status(500).json({
      message: "Server error while generating mood insight",
    });
  }
});

export default router;