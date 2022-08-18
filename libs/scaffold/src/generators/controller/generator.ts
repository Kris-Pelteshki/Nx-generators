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
import { ControllerGeneratorSchema } from './schema';

interface NormalizedSchema extends ControllerGeneratorSchema {
  workspace: string;
  projectRoot: string;
  sourceRoot: string;
  folderRoot: string;
  fileName: string;
}

function normalizeOptions(
  tree: Tree,
  options: ControllerGeneratorSchema
): NormalizedSchema {
  const { npmScope } = getWorkspaceLayout(tree);
  const { sourceRoot, root: projectRoot } = readProjectConfiguration(
    tree,
    options.project
  );

  const isLib = tree
    .children(`${projectRoot}/src`)
    ?.some((child) => child === 'lib');

  const prefix = isLib ? 'lib' : 'app';

  const folderRoot = options.directory
    ? `${sourceRoot}/${prefix}/${options.directory}`
    : `${sourceRoot}/${prefix}`;

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
  const isLib = tree
    .children(`${options.projectRoot}/src`)
    ?.some((child) => child === 'lib');

  if (!isLib) {
    return;
  }

  const indexPath = `${options.projectRoot}/src/index.ts`;
  const indexContent = tree.read(indexPath, 'utf-8');

  let sourceFile = ts.createSourceFile(
    indexPath,
    indexContent,
    ts.ScriptTarget.Latest,
    true
  );

  const filePath = options.directory
    ? `./lib/${options.directory}/${options.fileName}.controller`
    : `./lib/${options.fileName}.controller`;

  const exportString = `export * from '${filePath}';`;

  addGlobal(tree, sourceFile, indexPath, exportString);
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

export default async function (tree: Tree, options: ControllerGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);

  addFiles(tree, normalizedOptions);
  updateBarrel(tree, normalizedOptions);

  if (options.skipFormat) {
    await formatFiles(tree);
  }
}
