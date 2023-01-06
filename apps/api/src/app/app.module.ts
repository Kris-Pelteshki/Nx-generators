import { Module } from '@nestjs/common';
import { PrismaService } from '@nx-repo/prisma';
import { TodoRepo, TodoController } from '@nx-repo/todo/infrastructure';
import { UserController, UserRepo } from '@nx-repo/users/infrastructure';

@Module({
  controllers: [TodoController, UserController],
  providers: [PrismaService, TodoRepo, UserRepo],
})
export class AppModule {}
