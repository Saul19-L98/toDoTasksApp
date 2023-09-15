import { Router } from "express";
import register from "../controllers/Auth/registerController";
import login from "../controllers/Auth/loginController";
import logout from "../controllers/Auth/logoutController";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;
