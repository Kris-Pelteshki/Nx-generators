import {
  GeneratorCallback,
  installPackagesTask,
  Tree,
  formatFiles,
} from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/workspace/generators';
import {
  addExportsToBarrelFile,
  addProject,
  createFiles,
  deleteFiles,
  normalizeOptions,
  toLibraryGeneratorOptions,
  updateTsConfig,
} from './lib';
import type { LibraryGeneratorOptions } from './schema';

export default async function (
  tree: Tree,
  rawOptions: LibraryGeneratorOptions
): Promise<GeneratorCallback> {
  const options = normalizeOptions(tree, rawOptions);

  await libraryGenerator(tree, toLibraryGeneratorOptions(rawOptions));

  deleteFiles(tree, options);
  createFiles(tree, options);
  addExportsToBarrelFile(tree, options);
  updateTsConfig(tree, options);
  addProject(tree, options);

  if (!options.skipFormat) {
    await formatFiles(tree);
  }

  return () => {
    installPackagesTask(tree);
  };
}
