import {
  GeneratorCallback,
  installPackagesTask,
  Tree,
  formatFiles,
} from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/workspace/generators';

import {
  addProject,
  baseNormalizeOptions,
  deleteFiles,
  toLibraryGeneratorOptions,
  updateTsConfig,
} from '../../utils/lib-creation';
import repositoryGenerator from '../repository/generator';

export default async function (
  tree: Tree,
  rawOptions: LibraryGeneratorOptions
): Promise<GeneratorCallback> {
  const options = normalizeOptions(tree, rawOptions);

  await libraryGenerator(tree, toLibraryGeneratorOptions(options));
  deleteFiles(tree, options);

  // create repo files
  repositoryGenerator(tree, {
    ...rawOptions,
    project: options.projectName,
    directory: '',
    skipFormat: true,
  });

  updateTsConfig(tree, options);
  addProject(tree, options);

  if (!options.skipFormat) {
    await formatFiles(tree);
  }

  return () => {
    installPackagesTask(tree);
  };
}

function normalizeOptions(
  tree: Tree,
  options: LibraryGeneratorOptions
): NormalizedOptions {
  return {
    ...options,
    ...baseNormalizeOptions(tree, options),
  };
}
