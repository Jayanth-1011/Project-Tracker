import Task from "../models/task.js";
import Project from "../models/project.js";

// Create task and link to project
export const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, projectId } = req.body;

    // Validate that the project exists and belongs to the user
    const projectExists = await Project.findOne({
      _id: projectId,
      createdBy: req.user._id,
    });
    if (!projectExists)
      return res
        .status(404)
        .json({ error: "Project not found or unauthorized" });

    // Create the task and associate it with the project
    const task = await Task.create({
      title,
      description,
      status,
      priority,
      project: projectId, // Linking task to the project using projectId
      createdBy: req.user._id,
    });

    // Add the task to the project's task list
    projectExists.tasks.push(task._id);
    await projectExists.save();

    // Respond with the created task
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all tasks for a project
export const getTasksByProject = async (req, res) => {
  try {
    const tasks = await Task.find({
      project: req.params.projectId,
      createdBy: req.user._id,
    });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single task
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!task) return res.status(404).json({ error: "Task not found" });

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update task
export const updateTask = async (req, res) => {
  const {id } = req.params;  // Only need the taskId
  const { title, description, status, priority } = req.body;

  try {
    // Find and update the task using only taskId
    const task = await Task.findByIdAndUpdate(
      id,
      { title, description, status, priority },
      { new: true } // return the updated task
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task updated", task });
  } catch (error) {
    console.error("Update Task Error:", error);
    res.status(500).json({ message: "Server error while updating task" });
  }
};
// Delete task and remove from project
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!task) return res.status(404).json({ error: "Task not found" });

    await Project.findByIdAndUpdate(task.project, {
      $pull: { tasks: task._id },
    });

    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
