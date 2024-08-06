// controllers/taskController.js
const taskModel = require("../models/taskModel");

exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = await taskModel.create(req.user.id, title, description);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: "Error creating task" });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await taskModel.findByUserId(req.user.id);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error fetching tasks" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const task = await taskModel.update(id, req.user.id, title, description);
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error updating task" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await taskModel.softDelete(id, req.user.id);
    if (task) {
      res.json({ message: "Task deleted successfully" });
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting task" });
  }
};
