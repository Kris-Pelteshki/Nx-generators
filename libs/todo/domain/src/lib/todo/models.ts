import { PartialType } from '@nestjs/mapped-types';
import { Todo } from '@prisma/client';
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export type ITodo = Todo;
export type ICreateTodoDto = CreateTodoDto;
export type IUpdateTodoDto = UpdateTodoDto;

export class CreateTodoDto {
  @IsString()
  userId!: string;

  @IsString()
  title!: string;

  @IsOptional()
  @IsBoolean()
  done?: boolean;
}

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @IsString()
  id!: string;
}
