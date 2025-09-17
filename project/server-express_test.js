const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let tasks = [];

app.get("/tasks", (req,res) =>{
    res.json(tasks);
});

app.get("/tasks/:id", (req, res) => {
    const id = Number(req.params.id);
    const task = tasks.find(t => t.id === id);

    if (!task){
        res.status(404).json({error:"Task not found"})
    }
    res.json(task);
})

app.post("/tasks", (req, res)=>{
    const {title} = req.body;

    if (!title){
        return res.status(400).json({error:"Missing Title"});

    }
    const newTask = {id: tasks.length+1, title};
    tasks.push(newTask);
    res.status(201).json(newTask);

});

// Update task by id
app.put("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Missing title" });
  }

  task.title = title;
  res.json(task);
});
// Update task by id
app.put("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Missing title" });
  }

  task.title = title;
  res.json(task);
});

// Delete task by id
app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = tasks.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  const deleted = tasks.splice(index, 1);
  res.json({ message: "Task deleted", task: deleted[0] });
});


// /time
app.get("/time", (req, res) => {
  console.log("==== /time request ====");
  console.log({
    method: req.method,
    path: req.path,
    query: req.query,
    headers: req.headers
  });
  res.json({ now: new Date().toISOString() });
});

// /greet?name=Nira
app.get("/greet", (req, res) => {
  console.log("==== /greet request ====");
  console.log({
    method: req.method,
    path: req.path,
    query: req.query,
    headers: req.headers
  });
  const name = req.query.name || "Guest";
  res.send(`Hello ${name}`);
});

// /add?a=5&b=7
app.get("/add", (req, res) => {
  console.log("==== /add request ====");
  console.log({
    method: req.method,
    path: req.path,
    query: req.query,
    headers: req.headers
  });

  const a = Number(req.query.a);
  const b = Number(req.query.b);

  if (isNaN(a) || isNaN(b)) {
    res.status(400).json({ error: "Invalid Number(s)" });
  } else {
    res.json({ result: a + b });
  }
});

// Default 404
app.use((req, res) => {
  console.log("==== 404 request ====");
  console.log({
    method: req.method,
    path: req.path,
    query: req.query,
    headers: req.headers
  });
  res.status(404).json({ error: "Not Found" });
});

app.listen(PORT, () => {
  console.log(`✅ Express server listening at http://localhost:${PORT}`);
});
