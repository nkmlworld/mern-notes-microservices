const { error } = require("console");
const fs = require("fs");
const path = require("path");

const dataFile = path.join(__dirname, "../data/tasks.json");

//Helper : readt tasks from file
function readTasks(){
    const data = fs.readFileSync(dataFile, "utf-8");
    return JSON.parse(data);
}

function writeTasks(tasks){
    fs.writeFileSync(dataFile, JSON.stringify(tasks, null, 2));
}

// Controllers
exports.getAllTasks = (req, res) => {
    const tasks = readTasks();
    res.json(tasks);
};

exports.createTask = (req, res) => {
    const {title} = req.body;
    if (!title) return res.status(400).json({error : "Missing Title"});

    const tasks = readTasks();
    const newTask = {id: tasks.length+1, title};
    tasks.push(newTask);
    writeTasks(tasks);

    res.status(201).json(newTask);
 };

exports.getTaskById = (req, res) => {
    const id = Number(req.params.id);
    const tasks = readTasks();
    const task = tasks.find(t=> t.id === id);
    if (!task) return res.status(404).json({error: "Task not found"});
    res.json(task);
};

exports.updateTask = (req, res) => {
    const id = Number(req.params.id);
    const tasks = readTasks();
    const task = tasks.find(t => t.id === id);
    if (!task) return res.status(404).json({error:"Task not found"});

    const {title} = req.body;
    if (!title) return res.status(404).json({error:"Title not found"});
    task.title = title;
    writeTasks(tasks);

    res.json(tasks);
};

exports.deleteTask = (req, res) => {
    const id = Number(req.params.id);
    let tasks = readTasks();
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return res.status(404).json({error:"Task not found"});
    
    const deleted = tasks.splice(index, 1);
    writeTasks(tasks);

    res.json({ message: "Task deleted", task: deleted[0] });
   
    
};