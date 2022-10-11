import axios, { AxiosPromise } from 'axios';
import { IReturnMany, AxiosApiClient } from '@nx-repo/utils-domain-design';
import { ICreateUserDto, IUpdateUserDto } from '@nx-repo/users/domain';
import { User } from '@prisma/client';

type ITestApi<T> = {
  getOne(id: string): Promise<T>;
  getMany(params?: unknown): Promise<IReturnMany<T>>;
  create(data: ICreateUserDto): Promise<T>;
  update(data: IUpdateUserDto): Promise<T>;
  delete(id: string): Promise<T>;
};

const instance = axios.create({
  baseURL: 'http://localhost:3333/api/users',
});

class UsersApiClient implements AxiosApiClient<ITestApi<User>> {
  getOne(id: string): AxiosPromise<User> {
    return instance.get(`/${id}`);
  }

  getMany(params?: unknown): AxiosPromise<IReturnMany<User>> {
    throw new Error('Method not implemented.');
  }

  create(data: ICreateUserDto): AxiosPromise<User> {
    return instance.post(`/`, data);
  }

  update(data: IUpdateUserDto): AxiosPromise<User> {
    return instance.patch(`/${data.id}`, data);
  }

  delete(id: string): AxiosPromise<User> {
    return instance.delete(`/${id}`);
  }
}

export default new UsersApiClient();
