import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { Tree, readProjectConfiguration } from '@nrwl/devkit';

import generator from './generator';

describe('data-access generator', () => {
  let appTree: Tree;
  const options: DataAccessGeneratorSchema = {
    name: 'data-acess',
    directory: 'test',
    domainProject: 'todo-domain',
    prismaModel: 'Todo',
    clientType: 'axios',
  };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'data-access');
    expect(config).toBeDefined();
  });
});
