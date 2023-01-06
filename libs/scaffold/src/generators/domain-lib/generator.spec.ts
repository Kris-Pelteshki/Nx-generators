import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { Tree, readProjectConfiguration } from '@nrwl/devkit';

import generator from './generator';

describe('domain-lib generator', () => {
  let appTree: Tree;
  const options: DomainLibGeneratorSchema = {
    name: 'domain',
    prismaModel: 'Todo',
    directory: 'test',
    addRepoInterface: true,
    addApiInterface: true,
    idType: 'number',
  };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'domain');
    expect(config).toBeDefined();
  });
});
