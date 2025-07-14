import { Pool, PoolClient } from "pg";

export class PostgresConnection {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      host: "localhost",
      user: "postgres",
      password: "tu_password",
      database: "mydb",
      port: 5432,
    });
  }

  async connect(): Promise<PoolClient> {
    return await this.pool.connect();
  }
}
