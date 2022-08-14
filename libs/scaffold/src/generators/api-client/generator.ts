import {
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  names,
  offsetFromRoot,
  readProjectConfiguration,
  Tree,
} from '@nrwl/devkit';
import * as path from 'path';
import { ApiClientGeneratorSchema } from './schema';

interface NormalizedSchema extends ApiClientGeneratorSchema {
  projectRoot: string;
  sourceRoot: string;
  folderRoot: string;
  workspace: string;
}

function normalizeOptions(
  tree: Tree,
  options: ApiClientGeneratorSchema
): NormalizedSchema {
  const { npmScope } = getWorkspaceLayout(tree);
  const { sourceRoot, root: projectRoot } = readProjectConfiguration(
    tree,
    options.project
  );
  const folderRoot = options.directory
    ? `${sourceRoot}/${options.directory}`
    : sourceRoot;

  return {
    ...options,
    workspace: npmScope,
    projectRoot,
    sourceRoot,
    folderRoot,
  };
}

function addFiles(tree: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    ...names(options.prismaModel),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    template: '',
  };
  generateFiles(
    tree,
    path.join(__dirname, 'files'),
    options.folderRoot,
    templateOptions
  );
}

export default async function (tree: Tree, options: ApiClientGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);

  addFiles(tree, normalizedOptions);

  if (options.skipFormat) {
    await formatFiles(tree);
  }
}
