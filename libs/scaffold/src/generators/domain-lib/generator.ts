import { GeneratorCallback, Tree } from '@nrwl/devkit';

import {
  baseNormalizeOptions,
  enhancedLibraryGenerator,
} from '../../utils/lib-creation';
import domainEntityGenerator from '../domain-entity/generator';

export default async function (
  tree: Tree,
  rawOptions: DomainLibGeneratorSchema
): Promise<GeneratorCallback> {
  const options = baseNormalizeOptions(tree, rawOptions);

  return enhancedLibraryGenerator({
    tree,
    rawOptions,
    generators: () => [
      domainEntityGenerator(tree, {
        ...rawOptions,
        projectName: options.projectName,
        directory: '',
        skipFormat: true,
      }),
    ],
  });
}
