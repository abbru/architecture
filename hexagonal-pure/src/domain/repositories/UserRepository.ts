import { User } from "../models/User";

export interface UserRepository {
  save(user: User): Promise<void>;
  findAll(): Promise<User[]>;
}
