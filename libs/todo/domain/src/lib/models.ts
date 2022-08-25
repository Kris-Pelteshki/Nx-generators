import { IsString, IsOptional, IsBoolean } from 'class-validator';

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

export class UpdateTodoDto {
  @IsString()
  id!: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsBoolean()
  done?: boolean;
}
