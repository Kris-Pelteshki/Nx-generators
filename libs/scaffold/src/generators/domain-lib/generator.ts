import { GeneratorCallback, Tree } from '@nrwl/devkit';

import {
  baseNormalizeOptions,
  enhancedLibraryGenerator,
} from '../../utils/lib-creation';
import domainGenerator from '../domain/generator';

export default async function (
  tree: Tree,
  rawOptions: DomainLibGeneratorSchema
): Promise<GeneratorCallback> {
  const options = baseNormalizeOptions(tree, rawOptions);

  return enhancedLibraryGenerator({
    tree,
    rawOptions,
    generators: () => [
      domainGenerator(tree, {
        ...rawOptions,
        projectName: options.projectName,
        directory: '',
        skipFormat: true,
      }),
    ],
  });
}
