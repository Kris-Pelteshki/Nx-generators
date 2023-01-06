import {
  GeneratorCallback,
  installPackagesTask,
  Tree,
  formatFiles,
} from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/workspace/generators';

import {
  baseNormalizeOptions,
  deleteFiles,
  toLibraryGeneratorOptions,
  updateTsConfig,
} from '../../utils/lib-creation';
import repositoryGenerator from '../repository/generator';
import controllerGenerator from '../controller/generator';

export default async function (
  tree: Tree,
  rawOptions: InfraLibraryGeneratorOptions
): Promise<GeneratorCallback> {
  const options = normalizeOptions(tree, rawOptions);

  await libraryGenerator(tree, toLibraryGeneratorOptions(options));
  deleteFiles(tree, options);

  // create repo files
  await repositoryGenerator(tree, {
    ...rawOptions,
    project: options.projectName,
    directory: '',
    skipFormat: true,
  });

  await controllerGenerator(tree, {
    ...rawOptions,
    project: options.projectName,
    directory: '',
    skipFormat: true,
  });

  updateTsConfig(tree, options);

  if (!options.skipFormat) {
    await formatFiles(tree);
  }

  return () => {
    installPackagesTask(tree);
  };
}

function normalizeOptions(
  tree: Tree,
  options: InfraLibraryGeneratorOptions
): InfraNormalizedOptions {
  return {
    ...options,
    ...baseNormalizeOptions(tree, options),
  };
}
