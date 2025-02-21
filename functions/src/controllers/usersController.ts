import {Request, Response} from "express";
import {UserService} from "../services/userService";
import * as logger from "firebase-functions/logger";

const userService = new UserService();

export const getUser = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;
    if (!email) {
      res.status(400).send("The email is required");
    }
    const users = await userService.getUserByEmail(email);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send("Error retrieving users");
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const newUser = await userService.createUser(user);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).send("Error creating user");
  }
};
