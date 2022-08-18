import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { Tree, readProjectConfiguration } from '@nrwl/devkit';

import generator from './generator';
import { ControllerGeneratorSchema } from './schema';

describe('controller generator', () => {
  let appTree: Tree;
  const options: ControllerGeneratorSchema = {
    prismaModel: 'User',
    project: 'project-test',
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
