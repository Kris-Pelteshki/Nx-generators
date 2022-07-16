import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTodoDto, UpdateTodoDto } from '@nx-repo/todos/domain';
import { TodosRepo } from '@nx-repo/todos/infrastructure';

@Controller('todos')
export class TodosController {
  constructor(private readonly todoRepo: TodosRepo) {}

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.todoRepo.getOne(id);
  }

  @Post()
  create(@Body() data: CreateTodoDto) {
    return this.todoRepo.create(data);
  }

  @Patch(':id')
  update(@Body() data: UpdateTodoDto) {
    return this.todoRepo.update(data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.todoRepo.delete(id);
  }
}
