import type { LibraryGeneratorSchema } from '@nrwl/js/src/utils/schema';

export function toLibraryGeneratorOptions(
  options: BaseGenerateLibSchema
): LibraryGeneratorSchema {
  return {
    ...options,
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
