import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Request } from 'express';
import { join } from 'path';

import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module'; 
import { ModuleTrailModule } from './modules/trail/trail.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ModuleTrailModule, 
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      context: ({ req }: { req: Request }) => {
        // const token = req.headers.authorization || '';
        // let user = null;

        // if (token) {
        //   try {
        //     const decoded = require('jsonwebtoken').verify(
        //       token.replace('Bearer ', ''),
        //       process.env.SECRET_KEY,
        //     ) as { userId: string; role: string };
        //     user = { id: decoded.userId, role: decoded.role };
        //   } catch (err) {
        //     console.error('Invalid token');
        //   }
        // }

        // return { user };
      },
    }),
  ],
})
export class AppModule {}
