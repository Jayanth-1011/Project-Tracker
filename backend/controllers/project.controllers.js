import Project from '../models/project.js';
import Task from '../models/task.js';

// Create project
export const createProject = async (req, res) => {
  try {
    const { title, description } = req.body;
    console.log(req.user._id)
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const newProject = await Project.create({
      title,
      description,
    
      createdBy: req.user._id
    });

    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Get all projects for logged-in user
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({ createdBy: req.user._id });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single project by ID
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      createdBy: req.user._id
    }).populate('tasks');

    if (!project) return res.status(404).json({ error: 'Project not found' });

    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a project
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;

    console.log("UpdateProject =>", { id, userId }); // Debug

    const project = await Project.findOneAndUpdate(
      { _id: id, createdBy: userId },
      req.body,
      { new: true }
    );

    if (!project) return res.status(404).json({ error: "Project not found" });

    res.json(project);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: err.message });
  }
};


// Delete project
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id
    });

    if (!project) return res.status(404).json({ error: 'Project not found' });

    // Optionally delete related tasks too
    await Task.deleteMany({ _id: { $in: project.tasks } });

    res.json({ message: 'Project and associated tasks deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
