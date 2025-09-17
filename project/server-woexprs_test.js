const http = require("http");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  // 🔹 Log method, URL, and headers
  console.log("==== NEW REQUEST ====");
  console.log("Method:", req.method);
  console.log("URL:", req.url);
  console.log("Headers:", req.headers);   // 👈 here
  console.log("======================");
  // Log every request
  console.log(`${req.method} ${req.url} at ${new Date().toISOString()}`);

  // Parse URL once, use everywhere
  const parsedUrl = new URL(req.url, `http://localhost:${PORT}`);

  if (parsedUrl.pathname === "/time" && req.method === "GET") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ now: new Date().toISOString() }));
  } 
  else if (parsedUrl.pathname === "/greet" && req.method === "GET") {
    const name = parsedUrl.searchParams.get("name") || "Guest";
    res.writeHead(200, { "content-type": "text/plain" });
    res.end(`Hello ${name}`);
  }
  else if (parsedUrl.pathname === "/add" && req.method === "GET") {
    const a = Number(parsedUrl.searchParams.get("a"));
    const b = Number(parsedUrl.searchParams.get("b"));

    if (isNaN(a) || isNaN(b)) {
      res.writeHead(400, { "content-type": "application/json" });
      res.end(JSON.stringify({ error: "Invalid Number(s)" }));
    } else {
      const result = a + b;
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ result }));
    }
  }
  else {
    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify({ error: "Not Found", path: req.url }));
  }
});

server.listen(PORT, () => {
  console.log(`✅ Server is listening at http://localhost:${PORT}`);
});
