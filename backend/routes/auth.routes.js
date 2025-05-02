import express from "express";
import { login, signup, logout ,checkAuth} from "../controllers/auth.controllers.js";
import { protectRoute } from "../libs/protect.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/logout", protectRoute, logout);
router.get("/checkAuth", protectRoute, checkAuth);

export default router;
