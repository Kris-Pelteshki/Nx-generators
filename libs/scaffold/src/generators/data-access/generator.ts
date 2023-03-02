import { GeneratorCallback, Tree } from '@nrwl/devkit';

import {
  baseNormalizeOptions,
  enhancedLibraryGenerator,
} from '../../utils/lib-creation';
import apiClientGenerator from '../api-client/generator';

export default async function (
  tree: Tree,
  rawOptions: DataAccessGeneratorSchema
): Promise<GeneratorCallback> {
  const options = baseNormalizeOptions(tree, rawOptions);

  return enhancedLibraryGenerator({
    tree,
    rawOptions,
    generators: () => [
      apiClientGenerator(tree, {
        ...rawOptions,
        projectName: options.projectName,
        directory: '',
        skipFormat: true,
      }),
    ],
  });
}
