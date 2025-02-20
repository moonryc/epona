import { get as getEnv } from 'env-var';

export default {
  dbName: getEnv("DB_NAME").default("postgres").asString(),
  username: getEnv("DB_USERNAME").default("epona").asString(),
  password: getEnv("DB_PASSWORD").default("epona").asString(),
  host: getEnv("DB_HOST").default("localhost").asString(),
  port: getEnv("DB_PORT").default(5400).asPortNumber(),
  autoRunMigrations: getEnv("DB_AUTO_RUN_MIGRATIONS").default("false").asBool(),
}
