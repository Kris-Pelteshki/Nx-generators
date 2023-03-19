import { Tree } from '@nrwl/devkit';
import { DomainGeneratorSchema } from './schema';
import { baseNormalizeOptions } from '../../utils/lib-creation';
import domainLibGenerator from '../domain-lib/generator';
import dataAccessGenerator from '../data-access/generator';
import infraGenerator from '../infrastructure/generator';

export default async function (tree: Tree, rawOptions: DomainGeneratorSchema) {
  const options = {
    ...rawOptions,
    ...baseNormalizeOptions(tree, rawOptions),
  };

  const domainProject = `${options.name}-domain`;

  await domainLibGenerator(tree, {
    ...rawOptions,
    name: 'domain',
    directory: options.name,
  });

  await infraGenerator(tree, {
    ...rawOptions,
    name: 'infrastructure',
    directory: options.name,
    domainProject,
  });

  await dataAccessGenerator(tree, {
    ...rawOptions,
    name: 'data-access',
    directory: options.name,
    domainProject,
  });
}
