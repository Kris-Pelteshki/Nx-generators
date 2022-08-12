import { IRepo } from '@nx-repo/utils-domain-design';
import { User } from '@prisma/client';

export interface IUsersRepo extends IRepo<User> {}
