export class Result<T> {
  public isSuccess: boolean;
  public error: T | string;
  private _value!: T;

  public constructor(isSuccess: boolean, error: T | string = '', value?: T) {
    if (isSuccess && error) {
      throw new Error(
        'InvalidOperation: A result cannot be successful and contain an error'
      );
    }

    if (!isSuccess && !error) {
      throw new Error(
        'InvalidOperation: A failing result needs to contain an error message'
      );
    }

    if (value) {
      this._value = value;
    }

    this.isSuccess = isSuccess;
    this.error = error;

    Object.freeze(this);
  }

  public static ok<U>(value: U): Result<U> {
    return new Result<U>(true, '', value);
  }

  public static fail<U>(error: string | undefined): Result<U> {
    return new Result<U>(false, error);
  }

  public getValue(): T {
    if (!this.isSuccess) {
      throw new Error(
        'Can\'t get the value of an error result. Use "errorValue" instead.'
      );
    }

    return this._value;
  }

  public errorValue(): T | string {
    return this.error;
  }
}
