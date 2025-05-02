// store/useTaskStore.js
import { create } from 'zustand';
import axiosInstance from '../lib/axiosInstance.js';  

const useTaskStore = create((set) => ({
  tasks: [],
  loading: false,
  error: null,

  fetchTasks: async (projectId) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get(`/tasks/project/${projectId}`); 
      set({ tasks: res.data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  createTask: async (taskData, projectId) => {
    try {
      // Include the projectId in the taskData and send the POST request
      const res = await axiosInstance.post(`/tasks/`, { ...taskData, projectId });
      set((state) => ({ tasks: [...state.tasks, res.data] }));
    } catch (err) {
      set({ error: err.message });
    }
  },

  deleteTask: async (taskId) => {
    try {
      await axiosInstance.delete(`/tasks/${taskId}`); 
      set((state) => ({
        tasks: state.tasks.filter((t) => t._id !== taskId)
      }));
    } catch (err) {
      set({ error: err.message });
    }
  },
  updateTask: async (taskId, taskData) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.put(`/tasks/${taskId}`, taskData);
      const updatedTask = res.data.task;
  
      set((state) => ({
        tasks: state.tasks.map((t) => (t._id === taskId ? updatedTask : t)),
      }));
    } catch (err) {
      console.error("Failed to update task:", err);
      throw err;
    } finally {
      set({ loading: false });
    }
  }
  
}));

export default useTaskStore;
