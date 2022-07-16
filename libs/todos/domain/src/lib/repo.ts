import { IRepo } from '@nx-repo/core';
import { Todo } from '@prisma/client';

export interface ITodoRepo extends IRepo<Todo> {}
