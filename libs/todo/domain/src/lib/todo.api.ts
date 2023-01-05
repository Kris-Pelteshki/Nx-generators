import { BaseQueryParams, ReturnMany } from '@nx-repo/utils/domain';
import { ITodo, ICreateTodoDto, IUpdateTodoDto } from './todo.models';

export type ITodoApi = {
  getOne(id: string): Promise<ITodo | null>;
  getMany(params?: BaseQueryParams): Promise<ReturnMany<ITodo>>;
  create(data: ICreateTodoDto): Promise<ITodo>;
  update(data: IUpdateTodoDto): Promise<ITodo>;
  delete(id: string): Promise<ITodo>;
};
