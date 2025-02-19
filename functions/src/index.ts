import {onRequest} from "firebase-functions/v2/https";
import express, {Request, Response} from "express";
import {taskRoutes} from "./routes/tasksRoutes";
import {usersRoutes} from "./routes/usersRoutes";

const app = express();
app.use(express.json());

app.get("/hello", (req : Request, res : Response) => {
  res.send("Tasks");
});
app.use("/tasks", taskRoutes);
app.use("/users", usersRoutes);

export const api = onRequest(app);
