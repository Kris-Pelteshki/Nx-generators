import { Tree } from '@nrwl/devkit';

import {
  baseNormalizeOptions,
  enhancedLibraryGenerator,
} from '../../utils/lib-creation';
import repositoryGenerator from '../repository/generator';
import controllerGenerator from '../controller/generator';

export default async function (
  tree: Tree,
  rawOptions: InfraLibraryGeneratorOptions
) {
  const options = baseNormalizeOptions(tree, rawOptions);

  return enhancedLibraryGenerator({
    tree,
    rawOptions,
    generators: () => [
      repositoryGenerator(tree, {
        ...rawOptions,
        project: options.projectName,
        directory: '',
        skipFormat: true,
      }),
      controllerGenerator(tree, {
        ...rawOptions,
        project: options.projectName,
        directory: '',
        skipFormat: true,
      }),
    ],
  });
}
