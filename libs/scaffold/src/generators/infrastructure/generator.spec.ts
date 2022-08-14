import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { Tree, readProjectConfiguration } from '@nrwl/devkit';

import generator from './generator';
import { LibraryGeneratorOptions } from './schema';

describe('scaffold generator', () => {
  let appTree: Tree;
  const options: LibraryGeneratorOptions = {
    name: 'test',
    prismaModel: 'User',
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
