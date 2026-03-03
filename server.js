const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

//dummy data
let tasks = [
  {
    id: 1,
    title: "Estudiar Web APIs",
    completed: false,
  },
];
let currentId = 2;

//Obtener todas las tareas
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

//Crear nueva tarea
app.post("/tasks", (req, res) => {
  const { title, completed } = req.body;

  if (!title) {
    return res.status(400).json({ error: "El título es obligatorio" });
  }

  const newTask = {
    id: currentId++,
    title,
    completed: completed || false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

//Eliminar tarea
app.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = tasks.length;

  tasks = tasks.filter((task) => task.id !== id);

  if (tasks.length === initialLength) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }

  res.status(204).send(); // 204 No Content
});

app.listen(PORT, () => {
  console.log(`Task Manager API corriendo en http://localhost:${PORT}/tasks`);
});
