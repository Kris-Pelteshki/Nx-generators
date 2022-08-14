declare interface BaseGenerateLibSchema {
  name: string;
  directory?: string;
  skipTsConfig?: boolean;
  skipFormat?: boolean;
  tags?: string;

  strict?: boolean;
  testEnvironment?: 'jsdom' | 'node';
  unitTestRunner?: 'jest' | 'none';
  publishable?: boolean;
  buildable?: boolean;
  importPath?: string;
  linter?: Exclude<Linter, Linter.TsLint>;
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
  setParserOptionsProject?: boolean;
  standaloneConfig?: boolean;
}

declare interface BaseLibNormalizedOptions extends BaseGenerateLibSchema {
  className: string;
  fileName: string;
  parsedTags: string[];
  prefix: string;
  projectDirectory: string;
  projectName: string;
  projectRoot: string;
  unitTestRunner: 'jest' | 'none';
}
