import {Router} from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/tasksController";

// eslint-disable-next-line new-cap
const router = Router();

router.get("/", getTasks);
router.post("/", createTask);
router.patch("/", updateTask);
router.delete("/", deleteTask);

export {router as taskRoutes};
