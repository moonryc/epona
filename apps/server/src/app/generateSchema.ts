// import { NestFactory } from '@nestjs/core';
// import { GraphQLSchemaBuilderModule, GraphQLSchemaFactory } from '@nestjs/graphql';
// import { writeFile } from 'fs/promises';
// import { printSchema } from 'graphql/utilities';
// import { join } from 'path';
// import { ConversationResolver } from './conversation/conversation.resolver';
// import { ChatMessageResolver } from './chat-message/chat-message.resolver';
// import { EponaResolver } from './epona/epona.resolver';

import { join } from "path";

// const resolvers = [ConversationResolver, ChatMessageResolver, EponaResolver]

// async function generateSchema() {
//     const app = await NestFactory.create(GraphQLSchemaBuilderModule);
//     await app.init();

//     const schema = await app.get(GraphQLSchemaFactory).create(resolvers);

//     const schemaSDL = printSchema(schema);

//     const fileContent = `# eslint-disable\n\n${schemaSDL}`;

//     await writeFile(join(__dirname, '../gql/generated/schema.gql'), fileContent);
// }

// generateSchema();
console.log(join(__dirname, 'gql/generated/schema.gql'))