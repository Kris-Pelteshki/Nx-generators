import type { Observable } from 'rxjs';

export type IReturnMany<T> = {
  data: T[];
  count: number;
};

export interface IRepo<T> {
  getOne(id: string): Promise<T | null>;
  getMany(params?: unknown): Promise<IReturnMany<T>>;
  create(data: unknown): Promise<T>;
  update(data: unknown): Promise<T>;
  delete(id: string): Promise<T>;
}

export interface IObservableRepo<T> {
  getOne(id: string): Observable<T | null>;
  getMany(params?: unknown): Observable<IReturnMany<T>>;
  create(data: unknown): Observable<T>;
  update(data: unknown): Observable<T>;
  delete(id: string): Observable<T>;
}
