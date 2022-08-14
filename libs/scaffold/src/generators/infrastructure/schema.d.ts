import { Linter } from '@nrwl/linter';
import { UnitTestRunner } from '../../utils';

export interface LibraryGeneratorOptions {
  name: string;
  prismaModel: string;
  directory?: string;

  skipTsConfig?: boolean;
  skipFormat?: boolean;
  tags?: string;
  unitTestRunner?: UnitTestRunner;
  linter?: Exclude<Linter, Linter.TsLint>;
  importPath?: string;
  strict?: boolean;
  publishable?: boolean;
  target?:
    | 'es5'
    | 'es6'
    | 'esnext'
    | 'es2015'
    | 'es2016'
    | 'es2017'
    | 'es2018'
    | 'es2019'
    | 'es2020';
  testEnvironment?: 'jsdom' | 'node';
  buildable?: boolean;
  setParserOptionsProject?: boolean;
  standaloneConfig?: boolean;
}

export interface NormalizedOptions extends LibraryGeneratorOptions {
  prismaClientProperty: string;
  className: string;
  fileName: string;
  parsedTags: string[];
  prefix: string;
  projectDirectory: string;
  projectName: string;
  projectRoot: string;
}
