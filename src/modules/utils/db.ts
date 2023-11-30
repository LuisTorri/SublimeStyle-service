import { Pool } from "pg";

export default class DB {
  private connection: Pool;

  constructor() {
    this.connection = new Pool({
      connectionString:
        "postgres://default:jhecp9kXto3q@ep-royal-union-73204455-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb?sslmode=require",
      user: "default",
      host: "ep-royal-union-73204455-pooler.us-east-1.postgres.vercel-storage.com",
      database: "verceldb",
      password: "jhecp9kXto3q",
      port: 5432,
      ssl: true,
    });
    this.connection.connect();
  }

  public query(s: string): Promise<any> {
    return this.connection.query(s);
  }
}
