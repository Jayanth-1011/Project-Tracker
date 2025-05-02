import express from "express";
import { connectDB } from "./database/connectDB.js";
import authRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser";
import projectRoute from "./routes/project.routes.js"
import taskRoutes from "./routes/task.routes.js"
import cors from "cors"

const app = express();
app.use(cors({
  origin: "https://jay-projecttracker.netlify.app",
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter)
app.use("/api/projects", projectRoute)
app.use("/api/tasks", taskRoutes)


const PORT = process.env.PORT || 5000;


const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
