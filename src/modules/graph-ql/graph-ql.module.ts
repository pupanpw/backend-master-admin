import { Module } from '@nestjs/common';
import { GraphQLModule as NestGraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    NestGraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql', // Output file for the GraphQL schema
    }),
  ],
})
export class GraphQLModule {}
