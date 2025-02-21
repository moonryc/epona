import { ChatMessage, Conversation } from '@epona/epona-db';
import { NestFactory } from '@nestjs/core';
import { GraphQLSchemaBuilderModule, GraphQLSchemaFactory } from '@nestjs/graphql';
import { writeFile } from 'fs/promises';
import { printSchema } from 'graphql/utilities';
import { join } from 'path';

const resolvers = [ChatMessage, Conversation]

async function generateSchema() {
    const app = await NestFactory.create(GraphQLSchemaBuilderModule);
    await app.init();

    const schema = await app.get(GraphQLSchemaFactory).create(resolvers);

    const schemaSDL = printSchema(schema);

    const fileContent = `# eslint-disable\n\n${schemaSDL}`;

    await writeFile(join(__dirname, '../gql/generated/schema.gql'), fileContent);
}

generateSchema();