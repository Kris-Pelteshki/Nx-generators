import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { Tree, readProjectConfiguration } from '@nrwl/devkit';

import generator from './generator';

describe('scaffold generator', () => {
  let appTree: Tree;
  const options: InfraLibraryGeneratorOptions = {
    name: 'infrastructure',
    prismaModel: 'User',
    domainProject: 'todo-domain',
    nestApplication: 'api',
    idType: 'number',
    directory: 'dir',
  };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'infrastructure');
    expect(config).toBeDefined();
  });
});
