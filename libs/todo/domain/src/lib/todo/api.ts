import { Observable } from 'rxjs'; // only import if using observables
import { IReturnMany } from '@nx-repo/utils-domain-design';
import { ITodo, ICreateTodoDto, IUpdateTodoDto } from './models';

export interface ITodoApi {
  getOne(id: string): Promise<ITodo>;
  getMany(params?: unknown): Promise<IReturnMany<ITodo>>;
  create(data: ICreateTodoDto): Promise<ITodo>;
  update(data: IUpdateTodoDto): Promise<ITodo>;
  delete(id: string): Promise<ITodo>;
}

export interface ITodoObsApi {
  getOne(id: string): Observable<ITodo>;
  getMany(params?: unknown): Observable<IReturnMany<ITodo>>;
  create(data: ICreateTodoDto): Observable<ITodo>;
  update(data: IUpdateTodoDto): Observable<ITodo>;
  delete(id: string): Observable<ITodo>;
}
