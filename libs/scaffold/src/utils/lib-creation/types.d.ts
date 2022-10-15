declare type IAddProjectOptions = Pick<
  BaseLibNormalizedOptions,
  | 'projectName'
  | 'projectDirectory'
  | 'projectRoot'
  | 'publishable'
  | 'buildable'
>;

declare type IExportFileOptions = Pick<
  BaseLibNormalizedOptions,
  'projectRoot' | 'projectName'
> & {
  contentToAddToFile: string;
};

declare type IUpdateTsConfigOptions = Pick<
  BaseLibNormalizedOptions,
  'projectName' | 'target' | 'strict'
>;
