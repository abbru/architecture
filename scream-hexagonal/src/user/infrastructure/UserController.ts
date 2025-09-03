import express, { Request, Response } from "express";
import { UserService } from "../application/UserService";

export class UserController {
  public router = express.Router();

  constructor(private userService: UserService) {
    this.router.post("/users", this.createUser.bind(this));
    this.router.get("/users", this.getAllUsers.bind(this));
  }

  async createUser(req: Request, res: Response) {
    const { name, idClick } = req.body;
    try {
      await this.userService.createUser(name, idClick);
      res.status(201).json({ message: "User created" });
    } catch (error) {
      res.status(500).json({ error: "Error creating user" });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await this.userService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Error fetching users" });
    }
  }
}
