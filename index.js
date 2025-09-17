const mongoose = require("mongoose");
const User = require("./models/user");
const Note = require("./models/note");
const Tag = require("./models/tag");
const Comment = require("./models/comment");
const Share = require("./models/share");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/notes_app");
  console.log("✅ Connected to MongoDB");

  // --- CREATE ---
  const user = await User.create({ username: "alice", email: "alice@example.com" });
  const note = await Note.create({
    title: "First Note",
    content: "Hello, this is Alice’s first note!",
    userId: user._id,
  });
  console.log("🆕 Created:", note);

  // --- READ ---
  const fetched = await Note.findOne({ _id: note._id }).populate("userId", "username email");
  console.log("📖 Read:", fetched);

  // --- UPDATE ---
  const updated = await Note.findByIdAndUpdate(
    note._id,
    { $set: { title: "Updated Note Title" } },
    { new: true }
  );
  console.log("✏️ Updated:", updated);

  // --- DELETE ---
  await Note.findByIdAndDelete(note._id);
  console.log("🗑️ Deleted note with id:", note._id);

  await mongoose.disconnect();
  console.log("🔌 Disconnected");
}

main().catch(err => console.error(err));
