import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '@nx-repo/users/domain';
import { Prisma } from '@prisma/client';
import { UsersRepo } from 'libs/users/infrastructure/src';

@Controller('users')
export class UsersController {
  constructor(private readonly usersRepo: UsersRepo) {}

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.usersRepo.getOne(id);
  }

  @Post()
  async create(@Body() data: CreateUserDto) {
    try {
      return await this.usersRepo.create(data);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new BadRequestException(e.message);
        }
      }
      throw e;
    }
  }

  @Patch(':id')
  async update(@Body() data: UpdateUserDto) {
    return this.usersRepo.update(data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.usersRepo.delete(id);
  }
}
