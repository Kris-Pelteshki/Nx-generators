import {
  formatFiles,
  GeneratorCallback,
  installPackagesTask,
  Tree,
} from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/workspace/generators';
import { deleteFiles } from './delete-files';
import { baseNormalizeOptions } from './normalize-options';
import { toLibraryGeneratorOptions } from './toLibraryGeneratorOptions';
import { updateTsConfig } from './update-tsconfig';

type EnhancedLibraryGeneratorParams = {
  tree: Tree;
  rawOptions: BaseGenerateLibSchema;
  generators?: () => Array<void | Promise<void>>;
};

export const enhancedLibraryGenerator = async ({
  tree,
  rawOptions,
  generators,
}: EnhancedLibraryGeneratorParams) => {
  const options = baseNormalizeOptions(tree, rawOptions);

  await libraryGenerator(tree, toLibraryGeneratorOptions(options));

  deleteFiles(tree, options);
  updateTsConfig(tree, options);

  // exec other generators here
  await Promise.all(generators?.());

  if (!options.skipFormat) {
    await formatFiles(tree);
  }

  return () => {
    installPackagesTask(tree);
  };
};
