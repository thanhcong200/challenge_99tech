import "reflect-metadata";
import { DataSource } from "typeorm";
import { Product } from "./entities/product.entity";
import { DB_HOST, DB_PORT, DB_USER, DB_NAME, DB_SYNC, DB_LOG, DB_PASS } from "./common/environment";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  synchronize: DB_SYNC, // ⚠️ auto create tables (turn off in production)
  logging: DB_LOG,
  entities: [Product],
  migrations: [],
  subscribers: [],
});
