import { IRepo } from '@nx-repo/utils-domain-design';
import { Todo } from '@prisma/client';

export interface ITodoRepo extends IRepo<Todo> {}
