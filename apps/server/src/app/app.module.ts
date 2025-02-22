import { Module } from '@nestjs/common';
import path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EponaModule } from './epona/epona.module';
import { AppGateway } from './app.gateway';
import { EponaDbModule } from '@epona/epona-db';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ChatMessageModule } from './chat-message/chat-message.module';
import { ConversationModule } from './conversation/conversation.module';

@Module({
  imports: [
    EponaModule,
    EponaDbModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: path.join(__dirname, 'src/app/gql/generated/foo.schema.gql').replace('dist/', ''),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      sortSchema: true,
    }),
    ChatMessageModule,
    ConversationModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
