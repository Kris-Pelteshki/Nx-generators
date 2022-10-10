import {
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  names,
  offsetFromRoot,
  readProjectConfiguration,
  Tree,
} from '@nrwl/devkit';
import { addGlobal } from '@nrwl/workspace/src/utilities/ast-utils';
import * as path from 'path';
import * as ts from 'typescript';
import { BarrelUpdater, ExportStatementBuilder } from '../../utils';
import { ApiClientGeneratorSchema } from './schema';

interface NormalizedSchema extends ApiClientGeneratorSchema {
  projectRoot: string;
  sourceRoot: string;
  folderRoot: string;
  workspace: string;
  fileName: string;
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
    ? `${sourceRoot}/lib/${options.directory}`
    : `${sourceRoot}/lib`;

  return {
    ...options,
    workspace: npmScope,
    projectRoot,
    sourceRoot,
    folderRoot,
    fileName: names(options.prismaModel).fileName,
  };
}

function updateBarrel(tree: Tree, options: NormalizedSchema) {
  const exports = new ExportStatementBuilder()
    .directory(options.directory)
    .fileNames([`${options.fileName}.client`]);

  new BarrelUpdater(tree)
    .barrelPath(`${options.projectRoot}/src/index.ts`)
    .contentToAdd(exports.build())
    .update();
}

function addFiles(tree: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    ...names(options.prismaModel),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    template: '',
  };

  const filePath = options.useAxios ? 'files/axios' : 'files/fetch';

  generateFiles(
    tree,
    path.join(__dirname, filePath),
    options.folderRoot,
    templateOptions
  );
}

export default async function (tree: Tree, options: ApiClientGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);

  addFiles(tree, normalizedOptions);
  updateBarrel(tree, normalizedOptions);

  if (!options.skipFormat) {
    await formatFiles(tree);
  }
}
