import { UserRepository } from "../../domain/repositories/UserRepository";
import { User } from "../../domain/models/User";
import { PostgresConnection } from "../database/PostgresConnection";

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
}
