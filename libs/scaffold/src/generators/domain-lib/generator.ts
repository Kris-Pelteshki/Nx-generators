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
import domainGenerator from '../domain/generator';

export default async function (
  tree: Tree,
  rawOptions: DomainLibGeneratorSchema
): Promise<GeneratorCallback> {
  const options = normalizeOptions(tree, rawOptions);

  await libraryGenerator(tree, toLibraryGeneratorOptions(options));
  deleteFiles(tree, options);

  domainGenerator(tree, {
    ...rawOptions,
    projectName: options.projectName,
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
  options: DomainLibGeneratorSchema
): DomainNormalizedOptions {
  return {
    ...options,
    ...baseNormalizeOptions(tree, options),
  };
}
