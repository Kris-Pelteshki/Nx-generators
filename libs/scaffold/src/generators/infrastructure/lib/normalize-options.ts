import type { Tree } from '@nrwl/devkit';
import { names } from '@nrwl/devkit';
import type { LibraryGeneratorSchema as JsLibraryGeneratorSchema } from '@nrwl/js/src/utils/schema';

import { baseNormalizeOptions } from '../../../utils/lib-creation';
import type { LibraryGeneratorOptions, NormalizedOptions } from '../schema';

export function normalizeOptions(
  tree: Tree,
  options: LibraryGeneratorOptions
): NormalizedOptions {
  const baseOptions = baseNormalizeOptions(tree, options);

  const prismaClientProperty = names(options.prismaModel).propertyName;
  const fileName = names(options.prismaModel).propertyName;
  const className = names(options.prismaModel).className;

  return {
    ...options,
    ...baseOptions,
    prismaClientProperty,
    fileName,
    className,
  };
}

export function toLibraryGeneratorOptions(
  options: LibraryGeneratorOptions
): JsLibraryGeneratorSchema {
  return {
    name: options.name,
    buildable: options.buildable,
    directory: options.directory,
    importPath: options.importPath,
    linter: options.linter,
    publishable: options.publishable,
    skipFormat: true,
    skipTsConfig: options.skipTsConfig,
    strict: options.strict,
    tags: options.tags,
    testEnvironment: options.testEnvironment,
    unitTestRunner: options.unitTestRunner,
    config: options.standaloneConfig ? 'project' : 'workspace',
    setParserOptionsProject: options.setParserOptionsProject,
  };
}
