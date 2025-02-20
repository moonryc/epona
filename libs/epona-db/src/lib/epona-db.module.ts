import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NamingStrategy } from './namingStrategy';
import config from "./config"
import EponaChatMessageModuleDB from './epona-chat-message/epona-chat-message.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      namingStrategy: new NamingStrategy(),
      host: config.host,
      port: config.port,
      username: config.username,
      password: config.password,
      database: config.dbName,
      autoLoadEntities: true,
      migrations: [`${__dirname}/typeorm-migrations/**/*.{js,ts}`],
      migrationsTableName: "typeorm_migrations",
      synchronize: false,
    }),
    EponaChatMessageModuleDB
  ],
  exports: [
    EponaChatMessageModuleDB
  ]
})
export default class EponaDbModule {}
