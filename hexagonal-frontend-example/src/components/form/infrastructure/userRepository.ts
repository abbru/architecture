import { User } from '../domain/user';
import type { UserRepository } from '../application/userService';

export default class InMemoryUserRepository implements UserRepository {
  private getUsers(): Map<string, User> {
    const stored = localStorage.getItem('users');
    if (stored) {
      const usersObj = JSON.parse(stored);
      const users = new Map<string, User>();
      for (const [id, userData] of Object.entries(usersObj)) {
        users.set(id, new User((userData as any).id, (userData as any).name, (userData as any).email));
      }
      return users;
    }
    return new Map();
  }

  private saveUsers(users: Map<string, User>): void {
    const usersObj: any = {};
    for (const [id, user] of users) {
      usersObj[id] = { id: user.id, name: user.name, email: user.email };
    }
    localStorage.setItem('users', JSON.stringify(usersObj));
  }

  async save(user: User): Promise<void> {
    const users = this.getUsers();
    users.set(user.id, user);
    this.saveUsers(users);
  }

  async update(user: User): Promise<void> {
    const users = this.getUsers();
    users.set(user.id, user);
    this.saveUsers(users);
  }

  async findById(id: string): Promise<User | null> {
    const users = this.getUsers();
    return users.get(id) || null;
  }
}