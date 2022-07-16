import { Injectable } from '@nestjs/common';
import { IGetManyReturnMany, IRepo } from '@nx-repo/core';
import { PrismaService } from '@nx-repo/prisma';
import { CreateUserDto, UpdateUserDto } from '@nx-repo/users/domain';
import { User } from '@prisma/client';

@Injectable()
export class UsersRepo implements IRepo<User> {
  constructor(private readonly prisma: PrismaService) {}

  getOne(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  getMany(params?: unknown): Promise<IGetManyReturnMany<User>> {
    throw new Error('Method not implemented.');
  }

  create(data: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  update(data: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({
      data,
      where: {
        id: data.id,
      },
    });
  }

  delete(id: string): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
