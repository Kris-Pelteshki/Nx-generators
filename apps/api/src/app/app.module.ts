import { Module } from '@nestjs/common';
import { PrismaService } from '@nx-repo/prisma';
import { TodoRepo } from '@nx-repo/todo/infrastructure';
import { UserRepo } from 'libs/users/infrastructure/src';
import { TodoController } from './todo.controller';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController, TodoController],
  providers: [PrismaService, UserRepo, TodoRepo],
})
export class AppModule {}
