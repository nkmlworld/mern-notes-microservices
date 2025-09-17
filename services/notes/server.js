require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const Note = require("./models/note");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

// Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/notes_service")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("MongoDB error:", err));

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "Notes service healthy" });
});

// --- CRUD Routes ---

// CREATE
app.post("/notes", async (req, res) => {
  try {
    const { userId, title, content, tags } = req.body;
    if (!userId || !title || !content)
      return res.status(400).json({ error: "userId, title, content required" });

    const note = await Note.create({ userId, title, content, tags });
    res.status(201).json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// READ (all notes for a user)
app.get("/notes/:userId", async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.params.userId });
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// UPDATE
app.put("/notes/:id", async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const updated = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content, tags },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Note not found" });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE
app.delete("/notes/:id", async (req, res) => {
  try {
    const deleted = await Note.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Note not found" });
    res.json({ message: "Note deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`📝 Notes service running at http://localhost:${PORT}`);
});
