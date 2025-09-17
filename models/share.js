const mongoose = require("mongoose");

const shareSchema = new mongoose.Schema({
  noteId: { type: mongoose.Schema.Types.ObjectId, ref: "Note", required: true },
  sharedWith: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  permission: { type: String, enum: ["read", "edit"], default: "read" }
}, { timestamps: true });

module.exports = mongoose.model("Share", shareSchema);
