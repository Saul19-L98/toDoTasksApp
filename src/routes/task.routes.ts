import { Router } from "express";
import { authRequired } from "../middlewares/authRequired";
import { getTasks } from "../controllers/tasks/getTasksController";
import { getTask } from "../controllers/tasks/getTaskController";
import { createTask } from "../controllers/tasks/createTaskController";
import { deleteTask } from "../controllers/tasks/deleteTaskContoller";
import { updateTask } from "../controllers/tasks/updateTaskController";

const router = Router();

router.get("/tasks", authRequired, getTasks);
router.get("/tasks/:id", authRequired, getTask);
router.post("/tasks", authRequired, createTask);
router.delete("/tasks/:id", authRequired, deleteTask);
router.put("/tasks/:id", authRequired, updateTask);

export default router;
