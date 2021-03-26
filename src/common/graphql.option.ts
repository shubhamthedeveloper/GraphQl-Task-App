import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql';
import { formatError, GraphQLError } from 'graphql';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GraphQlOption implements GqlOptionsFactory {
  createGqlOptions(): GqlModuleOptions {
    return {
      autoSchemaFile: true,
      context: ({ req }) => ({ req }),
      formatError: (error: GraphQLError) => {
        return {
          message: error.message,
          statusCode: error.extensions.exception.response.statusCode,
          errorCode: error.extensions.exception.response.error,
        };
      },
    };
  }
}
