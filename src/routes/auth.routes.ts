import { Router } from "express";
import { register } from "../controllers/authFolder/registerController";
import { login } from "../controllers/authFolder/loginController";
import { logout } from "../controllers/authFolder/logoutController";
import profile from "../controllers/profile/profileController";
import { authRequired } from "../middlewares/authRequired";
import { registerSchema, loginSchema } from "../schemas/auth.schema";
import { validateData } from "../middlewares/validateData";
import { verifyToken } from "../controllers/authFolder/verifyController";

const router = Router();

router.post("/register", validateData(registerSchema), register);
router.post("/login", validateData(loginSchema), login);
router.get("/verify", verifyToken);
router.post("/logout", logout);
router.get("/profile", authRequired, profile);

export default router;
