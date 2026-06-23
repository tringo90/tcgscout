// Local dev proxy — run alongside vite with: node proxy.js
// Requires: npm install express cors dotenv

import express from "express";
import cors from "cors";
import { config } from "dotenv";

config(); // loads .env file

const app = express();
app.use(cors());
app.use(express.json({ limit: "20mb" })); // card images are large

app.post("/api/analyse", async (req, res) => {
  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: "Add ANTHROPIC_API_KEY to your .env file" });
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(response.ok ? 200 : response.status).json(data);
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).json({ error: "Proxy request failed" });
  }
});

app.listen(3000, () => {
  console.log("✓ Dev proxy running on http://localhost:3000");
  console.log("✓ API key:", process.env.ANTHROPIC_API_KEY ? "found" : "MISSING — add to .env");
});
