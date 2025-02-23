import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NamingStrategy } from './namingStrategy';
import config from "./config"
import ChatMessageModuleDB from './chat-message/chat-message.module';
import { ConversationModuleDB } from './conversation';

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
    ChatMessageModuleDB,
    ConversationModuleDB
  ],
  exports: [
    ChatMessageModuleDB,
    ConversationModuleDB
  ]
})
export default class EponaDbModule {}
