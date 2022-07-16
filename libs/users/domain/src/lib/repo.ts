import { IRepo } from '@nx-repo/core';
import { User } from '@prisma/client';

export interface IUsersRepo extends IRepo<User> {}
