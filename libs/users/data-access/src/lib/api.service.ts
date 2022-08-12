import axios from 'axios';
import { IReturnMany } from '@nx-repo/utils-domain-design';
import { ICreateUserDto, IUpdateUserDto } from '@nx-repo/users/domain';
import { User } from '@prisma/client';

interface IApiClient<T> {
  getOne(id: string): Promise<T>;
  getMany(params?: unknown): Promise<IReturnMany<T>>;
  create(data: ICreateUserDto): Promise<T>;
  update(data: IUpdateUserDto): Promise<T>;
  delete(id: string): Promise<T>;
}

type IUserApiClient = IApiClient<User>;

const instance = axios.create({
  baseURL: 'http://localhost:3333/api/users',
});

class UsersApiClient implements IUserApiClient {
  getOne(id: string): Promise<User> {
    return instance.get(`/${id}`);
  }

  getMany(params?: unknown): Promise<IReturnMany<User>> {
    throw new Error('Method not implemented.');
  }

  create(data: ICreateUserDto): Promise<User> {
    return instance.post(`/`, data);
  }

  update(data: IUpdateUserDto): Promise<User> {
    return instance.patch(`/${data.id}`, data);
  }

  delete(id: string): Promise<User> {
    return instance.delete(`/${id}`);
  }
}

export default new UsersApiClient();
