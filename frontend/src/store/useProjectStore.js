import { create } from 'zustand';
import axiosInstance from '../lib/axiosInstance.js';
import toast from 'react-hot-toast';

const useProjectStore = create((set, get) => ({
  projects: [],
  loading: false,
  error: null,

  fetchProjects: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get('/projects');
      set({ projects: res.data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
      toast.error(err.message || "Failed to fetch projects");
    }
  },

  createProject: async (projectData) => {
    const state = get();
    if (state.projects.length >= 4) {
      toast.error("You can only create up to 4 projects.");
      return;
    }

    try {
      const res = await axiosInstance.post('/projects', projectData);
      set((state) => ({ projects: [...state.projects, res.data] }));
      toast.success("Project created successfully!");
    } catch (err) {
      set({ error: err.message });
      toast.error(err.message || "Failed to create project");
    }
  },

  deleteProject: async (projectId) => {
    try {
      await axiosInstance.delete(`/projects/${projectId}`);
      set((state) => ({
        projects: state.projects.filter((p) => p._id !== projectId)
      }));
      toast.success("Project deleted successfully!");
    } catch (err) {
      set({ error: err.message });
      toast.error(err.message || "Failed to delete project");
    }
  },

  updateProject: async (projectId, updatedData) => {
    try {
      const res = await axiosInstance.put(`/projects/${projectId}`, updatedData);
      set((state) => ({
        projects: state.projects.map((project) =>
          project._id === projectId ? res.data : project
        ),
      }));
      toast.success("Project updated successfully!");
    } catch (err) {
      set({ error: err.message });
      toast.error(err.message || "Failed to update project");
    }
  },
}));

export default useProjectStore;
