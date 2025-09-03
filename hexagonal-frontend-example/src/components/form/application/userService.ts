import { User } from '../domain/user';

export interface UserRepository {
  save(user: User): Promise<void>;
  update(user: User): Promise<void>;
  findById(id: string): Promise<User | null>;
}

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(name: string, email: string): Promise<User> {
    const user = new User(crypto.randomUUID(), name, email);
    await this.userRepository.save(user);
    return user;
  }

  async updateUserEmail(id: string, newEmail: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new Error('User not found');
    user.updateEmail(newEmail);
    await this.userRepository.update(user);
    return user;
  }

  async getUser(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }
}