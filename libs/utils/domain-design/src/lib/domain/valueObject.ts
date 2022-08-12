export abstract class ValueObject<T> {
  public readonly props: T;

  constructor(props: T) {
    this.props = Object.freeze(props);
  }

  public equals(vo?: ValueObject<T>): boolean {
    if (vo === null || vo === undefined || vo.props === undefined) {
      return false;
    }

    return this.shallowEqual(this.props, vo.props);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private shallowEqual(object1: any, object2: any): boolean {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (const key of keys1) {
      if (object1[key] !== object2[key]) {
        return false;
      }
    }

    return true;
  }
}
