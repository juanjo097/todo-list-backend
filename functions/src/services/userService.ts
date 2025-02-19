import * as admin from "firebase-admin";
import {User} from "../models/userModel";

if (!admin.apps.length) {
  admin.initializeApp();
} else {
  admin.app();
}

const db = admin.firestore();

/**
 * Service class for handling user-related operations.
 */
export class UserService {
  /**
   * Retrieves all users from the database.
   * @param {String} email - User's email.
   * @return {Promise<{data: User, message: string}>}
   */
  async getUserByEmail(
    email: string
  ): Promise<{ data: User | null; message: string }> {
    const snapshot = await db
      .collection("users")
      .where("email", "==", email)
      .get();
    if (snapshot.empty) {
      return {data: null, message: "User not found"};
    }
    const doc = snapshot.docs[0];
    return {data: {id: doc.id, ...doc.data()} as User, message: "success"};
  }

  /**
   * Creates a new user in the database.
   *
   * @param {User} user - The user data to create.
   * @return {Promise<{data: User, message: string}>}
   */
  async createUser(user: User): Promise<{ data: User; message: string }> {
    const newUser = await db.collection("users").add(user);
    return {data: {id: newUser.id, ...user}, message: "success"};
  }
}
