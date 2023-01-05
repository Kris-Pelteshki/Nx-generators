import { Module } from '@nestjs/common';
import { PrismaService } from '@nx-repo/prisma';
import { TodoRepo, TodoController } from '@nx-repo/todo/infrastructure';
import { UserRepo } from '@nx-repo/users/infrastructure';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController, TodoController],
  providers: [PrismaService, UserRepo, TodoRepo],
})
export class AppModule {}
