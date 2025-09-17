const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  noteId: { type: mongoose.Schema.Types.ObjectId, ref: "Note", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  text:   { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Comment", commentSchema);
