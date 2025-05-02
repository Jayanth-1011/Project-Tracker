import express from "express";

import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/project.controllers.js";
import { protectRoute } from "../libs/protect.js";

const router = express.Router();

// Protect all routes
router.use(protectRoute);

// Create a new project
router.post("/", createProject);

// Get all projects for the logged-in user
router.get("/", getAllProjects);

// Get a specific project (with tasks optionally populated)
router.get("/:id", getProjectById);

// Update a project
router.put("/:id", updateProject);

// Delete a project
router.delete("/:id", deleteProject);

export default router;
