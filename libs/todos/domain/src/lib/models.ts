import { IsString, IsOptional, IsBoolean } from 'class-validator';

export type ICreateTodoDto = CreateTodoDto;
export type IUpdateTodoDto = UpdateTodoDto;

export class CreateTodoDto {
  @IsString()
  title!: string;

  @IsOptional()
  @IsBoolean()
  done?: boolean;

  @IsString()
  userId!: string;
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
