import { create } from 'zustand';
import axiosInstance from '../lib/axiosInstance';
import toast from 'react-hot-toast';

const useAuthStore = create((set) => ({
  user: null,
  loading: false,

  login: async (credentials) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post("/auth/login", credentials);
      set({ user: res.data.user });
      toast.success("Logged in successfully");
    } catch (err) {
      toast.error(err.response?.data?.error || "Login failed");
    } finally {
      set({ loading: false });
    }
  },

  signup: async (credentials) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post("/auth/signup", credentials);
      set({ user: res.data.user });
      toast.success("Signup successful");
    } catch (err) {
      toast.error(err.response?.data?.error || "Signup failed");
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.get("/auth/logout");
      set({ user: null });
      toast.success("Logged out");
    } catch (err) {
      toast.error("Logout failed");
    }
  },

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/checkAuth", { withCredentials: true });
      if (res.data.user) {
        set({ user: res.data.user });
      } else {
        set({ user: null });
      }
    } catch (err) {
      set({ user: null });
    }
  },
}));

export default useAuthStore;
