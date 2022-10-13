import { IReturnMany } from '@nx-repo/utils-domain-design';
import { IUser, ICreateUserDto, IUpdateUserDto } from './user.models';

export type IUserApi = {
  getOne(id: string): Promise<IUser>;
  getMany(params?: unknown): Promise<IReturnMany<IUser>>;
  create(data: ICreateUserDto): Promise<IUser>;
  update(data: IUpdateUserDto): Promise<IUser>;
  delete(id: string): Promise<IUser>;
};
