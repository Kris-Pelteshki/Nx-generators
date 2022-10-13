import { PartialType } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { IsString, IsOptional, IsEmail } from 'class-validator';

export type IUser = User;
export type ICreateUserDto = CreateUserDto;
export type IUpdateUserDto = UpdateUserDto;

export class CreateUserDto {
  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  firstName?: string | null;

  @IsOptional()
  @IsString()
  lastName?: string | null;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  id!: string;
}
