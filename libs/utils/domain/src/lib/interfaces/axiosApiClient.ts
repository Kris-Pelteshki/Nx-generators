import { AxiosPromise } from 'axios';

/**
 * Maps the controller's interface to the same interface with the return values of each method
 * wrapped in an `AxiosPromise` type.
 *
 * Note: This generic uses the `Awaited` utility type that was added in TS 4.5
 *
 * @see [Typescript mapped types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
 */
export type AxiosApiClient<
  Type extends Record<string, (...args: any[]) => Promise<unknown>>
> = {
  [Prop in keyof Type]: (
    ...args: Parameters<Type[Prop]>
  ) => AxiosPromise<Awaited<ReturnType<Type[Prop]>>>;
};
