import {Request, Response} from "express";
import {TaskService} from "../services/tasksServices";
import * as logger from "firebase-functions/logger";

const taskService = new TaskService();

export const getTasks = async (req: Request, res: Response) => {
  try {
    logger.info("Tasks Enetered");
    const userId = req.query.userId as string;
    logger.info("USER ID", userId);

    const tasks = await taskService.getTasksForUser(userId);
    res.status(200).json(tasks);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({message: error.message});
    } else {
      res.status(500).json({message: "An unknown error occurred"});
    }
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const task = await taskService.createTask(req.body);
    res.status(201).json(task);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({message: error.message});
    } else {
      res.status(500).json({message: "An unknown error occurred"});
    }
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const task = await taskService.updateTask(req.params.id, req.body);
    res.status(200).json(task);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({message: error.message});
    } else {
      res.status(500).json({message: "An unknown error occurred"});
    }
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    await taskService.deleteTask(req.params.id);
    res.status(204).json();
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({message: error.message});
    } else {
      res.status(500).json({message: "An unknown error occurred"});
    }
  }
};
