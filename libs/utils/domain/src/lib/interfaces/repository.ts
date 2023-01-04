import type { Observable } from 'rxjs';

export type ReturnMany<T> = {
  data: T[];
  count: number;
};

type IdType = string | number;

export interface Repo<
  Entity,
  CreateType,
  UpdateType,
  Id extends IdType = number
> {
  getOne(id: Id): Promise<Entity | null>;
  getMany(params?: unknown): Promise<ReturnMany<Entity>>;
  create(data: CreateType): Promise<Entity>;
  update(data: UpdateType): Promise<Entity>;
  delete(id: Id): Promise<Entity>;
}

export type ReadOnlyRepo<Entity, Id extends IdType = number> = Omit<
  Repo<Entity, unknown, unknown, Id>,
  'create' | 'update' | 'delete'
>;
export type WriteOnlyRepo<Entity, Id extends IdType = number> = Omit<
  Repo<Entity, unknown, unknown, Id>,
  'getOne' | 'getMany'
>;

export type ToObservableRepo<T> = {
  [Key in keyof T]: T[Key] extends (
    ...args: infer A
  ) => Promise<infer ReturnType>
    ? (...args: A) => Observable<ReturnType>
    : never;
};

export type ObsersableRepo<
  Entity,
  CreateType,
  UpdateType,
  Id extends IdType = number
> = ToObservableRepo<Repo<Entity, CreateType, UpdateType, Id>>;

export type ReadOnlyObservableRepo<
  Entity,
  Id extends IdType = number
> = ToObservableRepo<ReadOnlyRepo<Entity, Id>>;

export type WriteOnlyObservableRepo<
  Entity,
  Id extends IdType = number
> = ToObservableRepo<WriteOnlyRepo<Entity, Id>>;
