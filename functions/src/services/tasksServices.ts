import * as admin from "firebase-admin";
import {Task} from "../models/tasksModel";
import * as logger from "firebase-functions/logger";
import {FieldValue} from "firebase-admin/firestore";

if (!admin.apps.length) {
  admin.initializeApp();
} else {
  admin.app();
}

const db = admin.firestore();

/**
 * Service class for managing tasks in the database.
 */
export class TaskService {
  /**
   * Retrieves all users's tasks.
   * @param {String} userId - User Id.
   * @return {Promise<Task[]>}
   */
  async getTasksForUser(
    userId: string
  ): Promise<{ data: Task[] | null; message: string }> {
    try {
      if (!userId) {
        throw new Error("El userId es requerido.");
      }
      const snapshot = await db
        .collection("tasks")
        .where("userId", "==", userId)
        .orderBy("createdAt", "desc")
        .get();
      const tasks = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate ?
            data.createdAt.toDate().toISOString() :
            null,
        } as Task;
      });
      return {data: tasks, message: "success"};
    } catch (error) {
      logger.error("Error retrieving tasks:", error);
      return {data: null, message: "error"};
    }
  }

  /**
   * Creates a new task.
   * @param {Task} task - The task to create.
   * @return {Promise<Task>}
   */
  async createTask(task: Task): Promise<{ data: object; message: string }> {
    try {
      const newTask = {
        ...task,
        createdAt: FieldValue.serverTimestamp(),
      };
      const docRef = await db.collection("tasks").add(newTask);
      return {data: {id: docRef.id, ...newTask}, message: "success"};
    } catch (error) {
      logger.error("Error creating task:", error);
      return {data: {}, message: "error"};
    }
  }

  /**
   * Updates an existing task.
   * @param {string} id - The ID of the task to update.
   * @param {Task} task - The updated task data.
   * @return {Promise<Task>}
   */
  async updateTask(
    id: string, task: Task
  ): Promise<{ data: object; message: string }> {
    try {
      const taskData = {...task};
      logger.debug("DATA", taskData);
      await db.collection("tasks").doc(id).update(taskData);
      return {data: {}, message: "success"};
    } catch (error) {
      logger.error("Error updating task:", error);
      return {data: {}, message: "error"};
    }
  }

  /**
   * Deletes a task.
   * @param {string} id - The ID of the task to delete.
   * @return {Promise<void>}
   */
  async deleteTask(
    id: string
  ): Promise<{ data: object; message: string }> {
    try {
      await db.collection("tasks").doc(id).delete();
      return {data: {}, message: "success"};
    } catch (error) {
      logger.error("Error deleting task:", error);
      return {data: {}, message: "error"};
    }
  }
}
