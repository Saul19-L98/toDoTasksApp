import { Router } from "express";
import register from "../controllers/auth/registerController";
import login from "../controllers/auth/loginController";
import logout from "../controllers/auth/logoutController";
import profile from "../controllers/profile/profileController";
import { authRequired } from "../middlewares/authRequired";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", authRequired, profile);

export default router;
