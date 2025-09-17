const mongoose = require("mongoose");

async function resetDB() {
  await mongoose.connect("mongodb://127.0.0.1:27017/notes_app");
  console.log("✅ Connected to MongoDB");

  await mongoose.connection.dropDatabase();
  console.log("🧹 Database dropped. Fresh start!");

  await mongoose.disconnect();
  process.exit(0);
}

resetDB().catch(err => console.error(err));
