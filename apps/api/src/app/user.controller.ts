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
import { Prisma } from '@prisma/client';
import { IReturnMany } from '@nx-repo/utils-domain-design';
import {
  IUser,
  CreateUserDto,
  UpdateUserDto,
  IUserApi,
} from '@nx-repo/users/domain';
import { UserRepo } from '@nx-repo/users/infrastructure';

@Controller('users')
export class UserController implements IUserApi {
  constructor(private readonly userRepo: UserRepo) {}

  getMany(params?: unknown): Promise<IReturnMany<IUser>> {
    throw new Error('Method not implemented.');
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<IUser> {
    return this.userRepo.getOne(id);
  }

  @Post()
  async create(@Body() data: CreateUserDto): Promise<IUser> {
    try {
      return await this.userRepo.create(data);
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
  update(@Body() data: UpdateUserDto): Promise<IUser> {
    return this.userRepo.update(data);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<IUser> {
    return this.userRepo.delete(id);
  }
}
