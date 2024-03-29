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
  IUser,
  CreateUserDto,
  UpdateUserDto,
  IUserApi,
} from '@nx-repo/users/domain';
import { UserRepo } from './user.repo';

@Controller('users')
export class UserController implements IUserApi {
  constructor(private readonly userRepo: UserRepo) {}

  @Get(':id')
  getOne(@Param('id') id: string): Promise<IUser | null> {
    return this.userRepo.getOne(id);
  }

  @Get()
  getMany(@Query() params?: BaseQueryParams): Promise<ReturnMany<IUser>> {
    return this.userRepo.getMany(params);
  }

  @Post()
  create(@Body() data: CreateUserDto): Promise<IUser> {
    return this.userRepo.create(data);
  }

  @Patch(':id')
  update(@Body() data: UpdateUserDto): Promise<IUser> {
    return this.userRepo.update(data);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<IUser> {
    return this.userRepo.delete(id);
  }
}
