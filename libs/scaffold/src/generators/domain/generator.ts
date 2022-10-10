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
import {
  BarrelUpdater,
  ExportStatementBuilder,
  getFolderPath,
  interfaceNames,
} from '../../utils';
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

function updateBarrel(tree: Tree, options: NormalizedSchema) {
  const exports = new ExportStatementBuilder()
    .directory(options.directory)
    .fileNames([`${options.fileName}.models`]);

  if (options.addRepoInterface) {
    exports.addFile(`${options.fileName}.repo`);
  }

  if (options.addApiInterface) {
    exports.addFile(`${options.fileName}.api`);
  }

  new BarrelUpdater(tree)
    .barrelPath(`${options.projectRoot}/src/index.ts`)
    .contentToAdd(exports.build())
    .update();
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
