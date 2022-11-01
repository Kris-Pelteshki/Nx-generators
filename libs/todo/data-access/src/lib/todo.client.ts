import axios, { AxiosPromise } from 'axios';
import {
  BaseQueryParams,
  IReturnMany,
  AxiosApiClient,
} from '@nx-repo/utils-domain-design';
import {
  ITodo,
  ICreateTodoDto,
  IUpdateTodoDto,
  ITodoApi,
} from '@nx-repo/todo/domain';

// =================================================
// TODO: Update the baseURL for the API
// =================================================

const instance = axios.create({
  baseURL: 'http://localhost:3333/api/todos',
});

export class TodoClient implements AxiosApiClient<ITodoApi> {
  getOne(id: string): AxiosPromise<ITodo> {
    return instance.get(`/${id}`);
  }

  getMany(params?: BaseQueryParams): AxiosPromise<IReturnMany<ITodo>> {
    return instance.get('', { params });
  }

  create(data: ICreateTodoDto): AxiosPromise<ITodo> {
    return instance.post(``, data);
  }

  update(data: IUpdateTodoDto): AxiosPromise<ITodo> {
    return instance.patch(`/${data.id}`, data);
  }

  delete(id: string): AxiosPromise<ITodo> {
    return instance.delete(`/${id}`);
  }
}
