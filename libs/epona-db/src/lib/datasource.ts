import { DataSource } from 'typeorm';
import { NamingStrategy } from './namingStrategy';
import config from "./config"
import EponaChatMessage from './epona-chat-message/epona-chat-message.entity';

export default new DataSource({
  type: 'postgres',
  namingStrategy: new NamingStrategy(),
  host: config.host,
  port: config.port,
  username: config.username,
  password: config.password,
  database: config.dbName,
  entities: [EponaChatMessage],
  migrations: [`${__dirname}/typeorm-migrations/**/*.{js,ts}`],
  migrationsTableName: "typeorm_migrations",
});
