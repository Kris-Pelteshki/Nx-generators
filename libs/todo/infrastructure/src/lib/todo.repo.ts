import { Injectable } from '@nestjs/common';
import { BaseQueryParams, IReturnMany } from '@nx-repo/utils-domain-design';
import { PrismaService } from '@nx-repo/prisma';
import {
  ITodo,
  ICreateTodoDto,
  IUpdateTodoDto,
  ITodoRepo,
} from '@nx-repo/todo/domain';

@Injectable()
export class TodoRepo implements ITodoRepo {
  constructor(private readonly prisma: PrismaService) {}

  getOne(id: string): Promise<ITodo | null> {
    return this.prisma.todo.findUnique({
      where: { id },
    });
  }

  async getMany(params?: BaseQueryParams): Promise<IReturnMany<ITodo>> {
    const [count, data] = await Promise.all([
      this.prisma.todo.count(),
      this.prisma.todo.findMany(params),
    ]);

    return {
      count,
      data,
    };
  }

  create(data: ICreateTodoDto): Promise<ITodo> {
    return this.prisma.todo.create({
      data,
    });
  }

  update(data: IUpdateTodoDto): Promise<ITodo> {
    return this.prisma.todo.update({
      data,
      where: {
        id: data.id,
      },
    });
  }

  delete(id: string): Promise<ITodo> {
    return this.prisma.todo.delete({
      where: { id },
    });
  }
}
