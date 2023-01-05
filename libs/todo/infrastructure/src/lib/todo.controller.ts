import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { BaseQueryParams, ReturnMany } from '@nx-repo/utils/domain';
import {
  ITodo,
  CreateTodoDto,
  UpdateTodoDto,
  ITodoApi,
} from '@nx-repo/todo/domain';
import { TodoRepo } from './todo.repo';

@Controller('todos')
export class TodoController implements ITodoApi {
  constructor(private readonly todoRepo: TodoRepo) {}

  @Get(':id')
  getOne(@Param('id') id: string): Promise<ITodo | null> {
    return this.todoRepo.getOne(id);
  }

  @Get()
  getMany(@Query() params?: BaseQueryParams): Promise<ReturnMany<ITodo>> {
    return this.todoRepo.getMany(params);
  }

  @Post()
  create(@Body() data: CreateTodoDto): Promise<ITodo> {
    return this.todoRepo.create(data);
  }

  @Patch(':id')
  update(@Body() data: UpdateTodoDto): Promise<ITodo> {
    return this.todoRepo.update(data);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<ITodo> {
    return this.todoRepo.delete(id);
  }
}
