import { Repo } from '@nx-repo/utils/domain';
import { IUser, ICreateUserDto, IUpdateUserDto } from './user.models';

export interface IUserRepo
  extends Repo<IUser, ICreateUserDto, IUpdateUserDto, string> {}
