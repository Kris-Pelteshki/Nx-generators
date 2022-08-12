export interface IGuardResult {
  succeeded: boolean;
  message?: string;
}

export interface IGuardArgument {
  argument: unknown;
  argumentName: string;
}

export class Guard {
  public static combine(guardResults: IGuardResult[]): IGuardResult {
    for (const result of guardResults) {
      if (result.succeeded === false) return result;
    }

    return { succeeded: true };
  }

  public static againstNullOrUndefined(
    argument: unknown,
    argumentName: string
  ): IGuardResult {
    return argument === null || argument === undefined
      ? { succeeded: false, message: `${argumentName} is null or undefined` }
      : { succeeded: true };
  }

  public static againstNullOrUndefinedBulk(
    args: IGuardArgument[]
  ): IGuardResult {
    for (const arg of args) {
      const result = this.againstNullOrUndefined(
        arg.argument,
        arg.argumentName
      );
      if (!result.succeeded) return result;
    }

    return { succeeded: true };
  }

  public static againstEmptyArray(
    argument: unknown[],
    argumentName: string
  ): IGuardResult {
    return argument.length === 0
      ? { succeeded: false, message: `${argumentName} is empty` }
      : { succeeded: true };
  }

  public static inRange(
    num: number,
    min: number,
    max: number,
    argumentName: string
  ): IGuardResult {
    if (typeof num !== 'number' || isNaN(num)) {
      return { succeeded: false, message: `${argumentName} is not a string.` };
    }

    const isInRange = num >= min && num <= max;

    return isInRange
      ? { succeeded: true }
      : {
          succeeded: false,
          message: `${argumentName} is not within range ${min} to ${max}.`,
        };
  }
}
