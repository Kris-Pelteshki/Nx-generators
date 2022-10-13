import { Injectable } from '@nestjs/common';
import { IReturnMany } from '@nx-repo/utils-domain-design';
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

  getMany(params?: unknown): Promise<IReturnMany<ITodo>> {
    throw new Error('Method not implemented.');
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
