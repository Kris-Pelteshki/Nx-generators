import { BaseQueryParams, IReturnMany } from '@nx-repo/utils-domain-design';
import { ITodo, ICreateTodoDto, IUpdateTodoDto } from './models';

export type ITodoApi = {
  getOne(id: string): Promise<ITodo>;
  getMany(params?: BaseQueryParams): Promise<IReturnMany<ITodo>>;
  create(data: ICreateTodoDto): Promise<ITodo>;
  update(data: IUpdateTodoDto): Promise<ITodo>;
  delete(id: string): Promise<ITodo>;
};
