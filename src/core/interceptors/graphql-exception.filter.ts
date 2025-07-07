import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

@Catch()
export class GraphQLExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const path = gqlHost.getInfo().fieldName;

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const response = exception.getResponse();

      const message =
        typeof response === 'string'
          ? response
          : (response as any).message || 'Erro interno';

      return new GraphQLError(message, {
        extensions: {
          code: exception.name,
          statusCode: status,
          timestamp: new Date().toISOString(),
          path,
        },
      });
    }

    return new GraphQLError(exception.message || 'Erro interno', {
      extensions: {
        code: exception.name || 'INTERNAL_SERVER_ERROR',
        timestamp: new Date().toISOString(),
        path,
      },
    });
  }
}
