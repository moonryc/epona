import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NamingStrategy } from './namingStrategy';
import {config} from "@epona/backend-config"
import EponaChatMessageModuleDB from './epona-chat-message/epona-chat-message.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      namingStrategy: new NamingStrategy(),
      host: config.db.host,
      port: config.db.port,
      username: config.db.username,
      password: config.db.password,
      database: config.db.dbName,
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
