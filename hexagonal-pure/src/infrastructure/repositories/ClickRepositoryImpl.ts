import { ClickRepository } from "../../domain/repositories/ClickRepository";
import { Click } from "../../domain/models/Click";
import { PostgresConnection } from "../database/PostgresConnection";

export class ClickRepositoryImpl implements ClickRepository {
  constructor(private db: PostgresConnection) {}

  async updateClickStatus(click: Click): Promise<void> {
    const client = await this.db.connect();
    try {
      const query = "UPDATE click SET status = 'updated' WHERE idclick = $1";
      await client.query(query, [click.idClick]);
    } finally {
      client.release();
    }
  }
}
