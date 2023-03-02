import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { Tree, readProjectConfiguration } from '@nrwl/devkit';

import generator from './generator';
import domainGenerator from '../domain-lib/generator';

describe('data-access generator', () => {
  let appTree: Tree;
  const options: DataAccessGeneratorSchema = {
    name: 'data-access',
    domainProject: 'todo-domain',
    prismaModel: 'Todo',
    clientType: 'axios',
    idType: 'number',
  };

  beforeEach(async () => {
    appTree = createTreeWithEmptyWorkspace();
    await domainGenerator(appTree, {
      name: 'domain',
      directory: 'todo',
      prismaModel: 'Todo',
      addRepoInterface: true,
      addApiInterface: true,
      idType: 'number',
    });
  });

  it('should run successfully', async () => {
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'data-access');
    expect(config).toBeDefined();
  });
});
