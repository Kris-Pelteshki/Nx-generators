import { BaseQueryParams, ReturnMany } from '@nx-repo/utils-domain-design';
import { ITodo, ICreateTodoDto, IUpdateTodoDto } from './models';

export type ITodoApi = {
  getOne(id: string): Promise<ITodo>;
  getMany(params?: BaseQueryParams): Promise<ReturnMany<ITodo>>;
  create(data: ICreateTodoDto): Promise<ITodo>;
  update(data: IUpdateTodoDto): Promise<ITodo>;
  delete(id: string): Promise<ITodo>;
};
