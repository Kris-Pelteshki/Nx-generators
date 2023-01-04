import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { BaseQueryParams, ReturnMany } from '@nx-repo/utils-domain-design';
import {
  ITodo,
  CreateTodoDto,
  UpdateTodoDto,
  ITodoApi,
} from '@nx-repo/todo/domain';
import { TodoRepo } from '@nx-repo/todo/infrastructure';

@Controller('todos')
export class TodoController implements ITodoApi {
  constructor(private readonly todoRepo: TodoRepo) {}

  @Get()
  getMany(@Query() params?: BaseQueryParams): Promise<ReturnMany<ITodo>> {
    return this.todoRepo.getMany(params);
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<ITodo> {
    return this.todoRepo.getOne(id);
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
