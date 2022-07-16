import { Module } from '@nestjs/common';
import { PrismaService } from '@nx-repo/prisma';
import { TodosRepo } from '@nx-repo/todos/infrastructure';
import { UsersRepo } from 'libs/users/infrastructure/src';

import { TodosController } from './todos.controller';
import { UsersController } from './users.controller';

@Module({
  controllers: [TodosController, UsersController],
  providers: [PrismaService, TodosRepo, UsersRepo],
})
export class AppModule {}
