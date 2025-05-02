import { create } from 'zustand';
import axiosInstance from '../lib/axiosInstance.js';  

const useProjectStore = create((set) => ({
  projects: [],
  loading: false,


  fetchProjects: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get('/projects'); 
      set({ projects: res.data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  createProject: async (projectData) => {
    try {
      const res = await axiosInstance.post('/projects', projectData); 
      set((state) => ({ projects: [...state.projects, res.data] }));
    } catch (err) {
      set({ error: err.message });
    }
  },

  deleteProject: async (projectId) => {
    try {
      await axiosInstance.delete(`/projects/${projectId}`); 
      set((state) => ({
        projects: state.projects.filter((p) => p._id !== projectId)
      }));
    } catch (err) {
      set({ error: err.message });
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
    } catch (err) {
      set({ error: err.message });
    }
  },
}));

export default useProjectStore;
