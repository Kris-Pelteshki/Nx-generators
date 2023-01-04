import { Repo } from '@nx-repo/utils/domain';
import { ITodo, ICreateTodoDto, IUpdateTodoDto } from './todo.models';

export interface ITodoRepo
  extends Repo<ITodo, ICreateTodoDto, IUpdateTodoDto, string> {
  // Add your additional methods here
}
