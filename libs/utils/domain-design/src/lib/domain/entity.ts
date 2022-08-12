import { v4 as uuidv4 } from 'uuid';

const isEntity = (v: unknown): v is Entity<unknown> => {
  return v instanceof Entity;
};

export abstract class Entity<T> {
  protected readonly _id: string;
  public readonly props: T;

  constructor(props: T) {
    this._id = uuidv4();
    this.props = props;
  }

  public equals(object?: Entity<T>): boolean {
    if (object == null || object == undefined || !isEntity(object)) {
      return false;
    }

    return this._id === object._id;
  }
}
