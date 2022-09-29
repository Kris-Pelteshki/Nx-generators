import { IRepo } from '@nx-repo/utils-domain-design';
import { ITodo } from './models';

export interface ITodoRepo extends IRepo<ITodo> {}
