import {
  GeneratorCallback,
  installPackagesTask,
  Tree,
  formatFiles,
} from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/workspace/generators';
import {
  addExportsToExportFile,
  addProject,
  deleteFiles,
  updateTsConfig,
} from '../../utils/lib-creation';
import {
  createFiles,
  normalizeOptions,
  toLibraryGeneratorOptions,
} from './lib';
import type { LibraryGeneratorOptions } from './schema';

export default async function (
  tree: Tree,
  rawOptions: LibraryGeneratorOptions
): Promise<GeneratorCallback> {
  const options = normalizeOptions(tree, rawOptions);
  await libraryGenerator(tree, toLibraryGeneratorOptions(options));

  deleteFiles(tree, options);
  createFiles(tree, options);

  addExportsToExportFile(tree, {
    ...options,
    contentToAddToFile: `export * from './lib/${options.fileName}.repo';`,
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
