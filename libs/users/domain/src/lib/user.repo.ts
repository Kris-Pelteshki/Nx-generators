import { IRepo } from '@nx-repo/utils-domain-design';
import { IUser } from './user.models';

export interface IUserRepo extends IRepo<IUser> {}
