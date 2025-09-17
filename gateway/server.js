const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const authenticate = require("./middleware/auth");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

// Public route
app.get("/", (req, res) => {
  res.json({ message: "API Gateway is running" });
});

// Auth routes → no JWT needed
app.use(
  "/api/auth",
  createProxyMiddleware({
    target: "http://localhost:4000",
    changeOrigin: true,
    pathRewrite: { "^/api/auth": "" }
  })
);

// Notes routes → JWT protected
app.use(
  "/api/notes",
  authenticate, // check token before proxying
  createProxyMiddleware({
    target: "http://localhost:5000",
    changeOrigin: true,
    pathRewrite: { "^/api/notes": "" }
  })
);

app.listen(PORT, () => {
  console.log(`🚪 Gateway running at http://localhost:${PORT}`);
});
