import { UserRepository } from "../domain/UserRepository";
import { User } from "../domain/User";
import { PostgresConnection } from "../../shared/infrastructure/PostgresConnection";

export class UserRepositoryImpl implements UserRepository {
  constructor(private db: PostgresConnection) {}

  async save(user: User): Promise<void> {
    const client = await this.db.connect();
    try {
      const query = "INSERT INTO users (name) VALUES ($1)";
      await client.query(query, [user.name]);
    } finally {
      client.release();
    }
  }

  async findAll(): Promise<User[]> {
    const client = await this.db.connect();
    try {
      const query = "SELECT * FROM users";
      const result = await client.query(query);
      return result.rows.map((row) => new User(row.name));
    } finally {
      client.release();
    }
  }
}
