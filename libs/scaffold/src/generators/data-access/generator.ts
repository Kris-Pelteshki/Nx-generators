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
import apiClientGenerator from '../api-client/generator';

export default async function (
  tree: Tree,
  rawOptions: DataAccessGeneratorSchema
): Promise<GeneratorCallback> {
  const options = normalizeOptions(tree, rawOptions);

  await libraryGenerator(tree, toLibraryGeneratorOptions(options));
  deleteFiles(tree, options);

  apiClientGenerator(tree, {
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
  options: DataAccessGeneratorSchema
): BaseLibNormalizedOptions {
  return {
    ...options,
    ...baseNormalizeOptions(tree, options),
  };
}
