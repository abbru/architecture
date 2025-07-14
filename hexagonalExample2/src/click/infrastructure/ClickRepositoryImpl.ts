import { ClickRepository } from "../domain/ClickRepository";
import { Click } from "../domain/Click";
import { PostgresConnection } from "../../shared/infrastructure/PostgresConnection";

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
