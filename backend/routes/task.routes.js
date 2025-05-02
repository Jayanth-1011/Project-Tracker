import express from "express";
import {
  createTask,
  getTasksByProject,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/task.controllers.js";
import { protectRoute } from "../libs/protect.js";

const router = express.Router();

router.use(protectRoute);

// Create a task under a project
router.post("/", createTask);

// Get all tasks for a specific project
router.get("/project/:projectId", getTasksByProject);

// Get single task by ID
router.get("/:id", getTaskById);

// Update a task
router.put("/:id", updateTask);

// Delete a task
router.delete("/:id", deleteTask);

export default router;
