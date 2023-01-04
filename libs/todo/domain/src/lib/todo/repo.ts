import { Repo } from '@nx-repo/utils-domain-design';
import { ITodo, ICreateTodoDto, IUpdateTodoDto } from './models';

export interface ITodoRepo
  extends Repo<ITodo, ICreateTodoDto, IUpdateTodoDto, string> {}
