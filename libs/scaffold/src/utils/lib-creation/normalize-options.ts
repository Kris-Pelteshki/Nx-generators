import type { Tree } from '@nrwl/devkit';
import { getWorkspaceLayout, joinPathFragments, names } from '@nrwl/devkit';
import { Linter } from '@nrwl/linter';

export function baseNormalizeOptions<IOptions extends BaseGenerateLibSchema>(
  tree: Tree,
  options: IOptions
): BaseLibNormalizedOptions {
  const { libsDir, npmScope } = getWorkspaceLayout(tree);
  const name = names(options.name).fileName;
  const projectDirectory = options.directory
    ? `${names(options.directory).fileName}/${name}`
    : name;

  const projectRoot = joinPathFragments(libsDir, projectDirectory);

  const fileName = names(options.name).propertyName;
  const className = names(options.name).className;

  const parsedTags = options.tags
    ? options.tags.split(',').map((s) => s.trim())
    : [];

  return {
    name,
    fileName,
    className,
    linter: options.linter ?? Linter.EsLint,
    parsedTags,
    prefix: npmScope,
    projectDirectory,
    projectName: projectDirectory,
    projectRoot,
    target: options.target ?? 'es6',
    testEnvironment: options.testEnvironment ?? 'node',
    unitTestRunner: options.unitTestRunner ?? 'none',
  };
}
