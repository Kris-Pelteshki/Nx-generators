import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { Tree, readProjectConfiguration } from '@nrwl/devkit';

import generator from './generator';
import { ControllerGeneratorSchema } from './schema';

describe('controller generator', () => {
  let appTree: Tree;
  const options: ControllerGeneratorSchema = {
    prismaModel: 'Todo',
    project: 'project-infrastructure',
    domainProject: 'todo-domain',
    nestApplication: 'api',
    idType: 'number',
  };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
  });

  // TODO fix test
  it('should run successfully', async () => {
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'project-infrastructure');
    expect(config).toBeDefined();
  });
});
