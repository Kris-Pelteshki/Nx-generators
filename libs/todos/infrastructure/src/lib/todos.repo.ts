import { Injectable } from '@nestjs/common';
import { IGetManyReturnMany, IRepo } from '@nx-repo/core';
import { PrismaService } from '@nx-repo/prisma';
import { CreateTodoDto, UpdateTodoDto } from '@nx-repo/todos/domain';
import { Todo } from '@prisma/client';

@Injectable()
export class TodosRepo implements IRepo<Todo> {
  constructor(private readonly prisma: PrismaService) {}

  getOne(id: string): Promise<Todo | null> {
    return this.prisma.todo.findUnique({
      where: {
        id,
      },
    });
  }

  getMany(params?: unknown): Promise<IGetManyReturnMany<Todo>> {
    throw new Error('Method not implemented.');
  }

  create(data: CreateTodoDto): Promise<Todo> {
    return this.prisma.todo.create({
      data,
    });
  }

  update(data: UpdateTodoDto): Promise<Todo> {
    return this.prisma.todo.update({
      data: data,
      where: {
        id: data.id,
      },
    });
  }

  delete(id: string): Promise<Todo> {
    return this.prisma.todo.delete({
      where: {
        id,
      },
    });
  }
}
