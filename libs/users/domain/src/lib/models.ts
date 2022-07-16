import { PartialType } from '@nestjs/swagger';
import { IsString, IsOptional, IsEmail } from 'class-validator';

export type ICreateUserDto = CreateUserDto;
export type IUpdateUserDto = UpdateUserDto;

export class CreateUserDto {
  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  firstName!: string | null;

  @IsOptional()
  @IsString()
  lastName!: string | null;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  id!: string;
}
