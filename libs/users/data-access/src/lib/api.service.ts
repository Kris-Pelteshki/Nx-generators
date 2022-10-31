import axios, { AxiosPromise } from 'axios';
import {
  IReturnMany,
  AxiosApiClient,
  BaseQueryParams,
} from '@nx-repo/utils-domain-design';
import {
  ICreateUserDto,
  IUpdateUserDto,
  IUserApi,
} from '@nx-repo/users/domain';
import { User } from '@prisma/client';

const instance = axios.create({
  baseURL: 'http://localhost:3333/api/users',
});

class UsersApiClient implements AxiosApiClient<IUserApi> {
  getOne(id: string): AxiosPromise<User> {
    return instance.get(`/${id}`);
  }

  getMany(params?: BaseQueryParams): AxiosPromise<IReturnMany<User>> {
    return instance.get('/', { params });
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
