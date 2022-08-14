import { Linter } from '@nrwl/linter';

export interface LibraryGeneratorOptions extends BaseGenerateLibSchema {
  prismaModel: string;
}

export interface NormalizedOptions extends BaseLibNormalizedOptions {
  prismaModel: string;
  prismaClientProperty: string;
}
