import {Router} from "express";
import {
  getUser,
  createUser,
} from "../controllers/usersController";

// eslint-disable-next-line new-cap
const router = Router();

router.get("/", getUser);
router.post("/", createUser);

export {router as usersRoutes};
