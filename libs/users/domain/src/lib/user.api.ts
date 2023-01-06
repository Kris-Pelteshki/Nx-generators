import { BaseQueryParams, ReturnMany } from '@nx-repo/utils/domain';
import { IUser, ICreateUserDto, IUpdateUserDto } from './user.models';

export type IUserApi = {
  getOne(id: string): Promise<IUser | null>;
  getMany(params?: BaseQueryParams): Promise<ReturnMany<IUser>>;
  create(data: ICreateUserDto): Promise<IUser>;
  update(data: IUpdateUserDto): Promise<IUser>;
  delete(id: string): Promise<IUser>;
};
