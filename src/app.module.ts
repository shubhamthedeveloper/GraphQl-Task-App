import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { GraphQlOption } from './common/graphql.option';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    GraphQLModule.forRootAsync({
      useClass: GraphQlOption,
    }),
    TaskModule,
    AuthModule,
  ],
})
export class AppModule {}
