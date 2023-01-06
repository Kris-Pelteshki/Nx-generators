import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { Tree, readProjectConfiguration } from '@nrwl/devkit';

import generator from './generator';

describe('repository generator', () => {
  let appTree: Tree;
  const options: RepositoryGeneratorSchema = {
    project: 'test',
    prismaModel: 'Todo',
    domainProject: 'todo-domain',
    directory: 'dir',
    idType: 'number',
  };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'test');
    expect(config).toBeDefined();
  });
});
