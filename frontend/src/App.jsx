import { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dash from "./components/Dash";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import HomePage from "./pages/HomePage.jsx";
import { Toaster } from "react-hot-toast";
import useAuthStore from "./store/useAuthStore.js";
import TaskContainer from "./pages/TaskContainer.jsx";

const App = () => {
  const user = useAuthStore((state) => state.user);
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  });

  return (
    <div data-theme="emerald">
      <Toaster position="top-right" />
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Navigate to="/homepage" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Public routes, redirect if already logged in */}
        <Route
          path="/login"
          element={user ? <Navigate to="/homepage" replace /> : <Login />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/homepage" replace /> : <Signup />}
        />

        {/* Private route */}
        <Route
          path="/homepage"
          element={user ? <HomePage /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/project/:id"
          element={user ? <TaskContainer /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </div>
  );
};

export default App;
