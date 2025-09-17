const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const taskRoutes = require("../routes/taskRoutes.js");

app.use("/tasks", taskRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

app.listen(PORT, () => {
  console.log(`✅ Server listening at http://localhost:${PORT}`);
});