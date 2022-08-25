import { Module } from '@nestjs/common';
import { PrismaService } from '@nx-repo/prisma';
import { UsersRepo } from 'libs/users/infrastructure/src';

import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [PrismaService, UsersRepo],
})
export class AppModule {}
