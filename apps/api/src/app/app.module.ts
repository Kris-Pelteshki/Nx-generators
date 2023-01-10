import { Module } from '@nestjs/common';
import { PrismaService } from '@nx-repo/prisma';
import { UserController, UserRepo } from '@nx-repo/users/infrastructure';
import { TodoController, TodoRepo } from '@nx-repo/todo/infrastructure';

@Module({
  controllers: [UserController, TodoController],
  providers: [PrismaService, UserRepo, TodoRepo],
})
export class AppModule {}
