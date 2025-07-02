import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthModule } from './module/auth.module';
import { Request } from 'express';

@Module({
  imports: [
    AuthModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      context: ({ req }: {req: Request}) => {
        const token = req.headers.authorization || '';
        let user = null;

        if (token) {
          try {
            const decoded = require('jsonwebtoken').verify(
              token.replace('Bearer ', ''),
              process.env.SECRET_KEY,
            ) as { userId: string; role: string };
            user = { id: decoded.userId, role: decoded.role };
          } catch (err) {
            console.error('Invalid token');
          }
        }

        return { user };
      },
    }),
  ],
})
export class AppModule {}
