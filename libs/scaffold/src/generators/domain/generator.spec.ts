import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { Tree, readProjectConfiguration } from '@nrwl/devkit';

import generator from './generator';

describe('domain generator', () => {
  let appTree: Tree;
  const options: DomainGeneratorSchema = {
    projectName: 'todo-domain',
    prismaModel: 'Todo',
    addApiInterface: true,
    addRepoInterface: true,
    directory: 'dir',
    idType: 'number',
  };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'todo-domain');
    expect(config).toBeDefined();
  });
});
