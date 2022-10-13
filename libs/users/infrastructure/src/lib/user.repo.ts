import { Injectable } from '@nestjs/common';
import { IReturnMany } from '@nx-repo/utils-domain-design';
import { PrismaService } from '@nx-repo/prisma';
import {
  IUser,
  ICreateUserDto,
  IUpdateUserDto,
  IUserRepo,
} from '@nx-repo/users/domain';

@Injectable()
export class UserRepo implements IUserRepo {
  constructor(private readonly prisma: PrismaService) {}

  getOne(id: string): Promise<IUser | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  getMany(params?: unknown): Promise<IReturnMany<IUser>> {
    throw new Error('Method not implemented.');
  }

  create(data: ICreateUserDto): Promise<IUser> {
    return this.prisma.user.create({
      data,
    });
  }

  update(data: IUpdateUserDto): Promise<IUser> {
    return this.prisma.user.update({
      data,
      where: {
        id: data.id,
      },
    });
  }

  delete(id: string): Promise<IUser> {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
