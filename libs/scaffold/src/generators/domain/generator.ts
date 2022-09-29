import {
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  joinPathFragments,
  names,
  offsetFromRoot,
  readProjectConfiguration,
  Tree,
} from '@nrwl/devkit';
import { addGlobal } from '@nrwl/workspace/src/utilities/ast-utils';
import * as path from 'path';
import * as ts from 'typescript';
import { interfaceNames } from '../../utils/formats';
import {
  getTsPath,
  getFolderPath,
  getExportStatement,
} from '../../utils/paths';
import { DomainGeneratorSchema } from './schema';

interface NormalizedSchema extends DomainGeneratorSchema {
  projectRoot: string;
  sourceRoot: string;
  folderRoot: string;
  workspace: string;
  fileName: string;
  prismaClientProperty: string;
}

function normalizeOptions(
  tree: Tree,
  options: DomainGeneratorSchema
): NormalizedSchema {
  const { npmScope } = getWorkspaceLayout(tree);
  const { sourceRoot, root: projectRoot } = readProjectConfiguration(
    tree,
    options.project
  );
  const folderRoot = getFolderPath(sourceRoot, options.directory);

  const prismaClientProperty = names(options.prismaModel).propertyName;
  const fileName = names(options.prismaModel).propertyName;

  return {
    ...options,
    workspace: npmScope,
    projectRoot,
    sourceRoot,
    folderRoot,
    fileName,
    prismaClientProperty,
  };
}

// TODO: update exports
function updateBarrel(tree: Tree, options: NormalizedSchema) {
  const indexPath = `${options.projectRoot}/src/index.ts`;
  const indexContent = tree.read(indexPath, 'utf-8');

  let sourceFile = ts.createSourceFile(
    indexPath,
    indexContent,
    ts.ScriptTarget.Latest,
    true
  );

  let exportString = getExportStatement(
    `${options.fileName}.models`,
    options.directory
  );

  if (options.addRepoInterface) {
    exportString +=
      '\n' + getExportStatement(`${options.fileName}.repo`, options.directory);
  }

  if (options.addApiInterface) {
    exportString +=
      '\n' + getExportStatement(`${options.fileName}.api`, options.directory);
  }

  addGlobal(tree, sourceFile, indexPath, exportString);
}

function addFiles(tree: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    ...names(options.prismaModel),
    ...interfaceNames(options.prismaModel),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    template: '',
  };

  const genFiles = (pathTo: string) =>
    generateFiles(
      tree,
      path.join(__dirname, pathTo),
      options.folderRoot,
      templateOptions
    );

  genFiles('files/common');

  if (options.addRepoInterface) {
    genFiles('files/repo');
  }
  if (options.addApiInterface) {
    genFiles('files/api');
  }
}

export default async function (tree: Tree, options: DomainGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);

  addFiles(tree, normalizedOptions);
  updateBarrel(tree, normalizedOptions);

  if (!options.skipFormat) {
    await formatFiles(tree);
  }
}
