import { Injectable } from '@nestjs/common';
import { BaseQueryParams, ReturnMany } from '@nx-repo/utils/domain';
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

  async getMany(params?: BaseQueryParams): Promise<ReturnMany<IUser>> {
    const [count, data] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.user.findMany(params),
    ]);

    return {
      count,
      data,
    };
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
