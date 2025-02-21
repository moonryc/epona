import { DataSource } from 'typeorm';
import { NamingStrategy } from './namingStrategy';
import config from "./config"

export default new DataSource({
  type: 'postgres',
  namingStrategy: new NamingStrategy(),
  host: config.host,
  port: config.port,
  username: config.username,
  password: config.password,
  database: config.dbName,
  entities: [`${__dirname}/**/*.entity.{js,ts}`],
  migrations: [`${__dirname}/typeorm-migrations/**/*.{js,ts}`],
  migrationsTableName: "typeorm_migrations",
});
