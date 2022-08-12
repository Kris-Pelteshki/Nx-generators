import { Linter } from '@nrwl/linter';
import { UnitTestRunner } from '../utils';

export interface LibraryGeneratorOptions {
  name: string;
  directory?: string;
  skipTsConfig?: boolean;
  skipFormat?: boolean;
  tags?: string;
  unitTestRunner?: UnitTestRunner;
  linter?: Exclude<Linter, Linter.TsLint>;
  importPath?: string;
  strict?: boolean;
  controller?: boolean;
  global?: boolean;
  publishable?: boolean;
  service?: boolean;
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
  fileName: string;
  parsedTags: string[];
  prefix: string;
  projectDirectory: string;
  projectName: string;
  projectRoot: string;
}
