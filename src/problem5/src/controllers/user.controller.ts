import { Request, Response } from "express";
import { UserRepository } from "../repositories/user.repository";
import { UserDto } from "../models/user.model";

export class UserController {
  private userRepo: UserRepository;

  constructor() {
    this.userRepo = new UserRepository();
  }

  getAllUsers = async (req: Request, res: Response) => {
    try {
      const keyword = req.query.keyword as string;
      const orderBy = req.query.orderBy as string;
      const sort = req.query.sort as string;

      const users = await this.userRepo.findAll(keyword, orderBy, sort);
      res.json(users);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Failed to get users" });
    }
  };

  getUserById = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const user = await this.userRepo.findById(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Failed to get user" });
    }
  };

  createUser = async (req: Request, res: Response) => {
    try {
      const userData: UserDto = req.body;

      if (!userData.name || !userData.email) {
        return res.status(400).json({ error: "Name and email are required" });
      }

      // Check if user with email already exists
      const existingUser = await this.userRepo.findByEmail(userData.email);
      if (existingUser) {
        return res
          .status(400)
          .json({ error: "User with email already exists" });
      }

      const userId = await this.userRepo.create(userData);
      res
        .status(201)
        .json({ id: userId, message: "User created successfully" });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Failed to create user" });
    }
  };

  updateUser = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const userData: Partial<UserDto> = req.body;

      // Check if email is being updated AND if the new email already exists (excluding the current user)
      if (userData.email !== undefined) {
        const existingUserWithSameEmail = await this.userRepo.findByEmail(
          userData.email
        );

        if (existingUserWithSameEmail && existingUserWithSameEmail.id !== id) {
          return res.status(400).json({ error: "Email already exists" });
        }
      }

      const success = await this.userRepo.update(id, userData);
      if (!success) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json({ id: id, message: "User updated successfully" });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Failed to update user" });
    }
  };

  deleteUser = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const success = await this.userRepo.delete(id);
      if (!success) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Failed to delete user" });
    }
  };
}
