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
  getTsPath,
  interfaceNames,
} from '../../utils';
import { ControllerGeneratorSchema } from './schema';

interface NormalizedSchema extends ControllerGeneratorSchema {
  workspace: string;
  projectRoot: string;
  domainImportPath: string;
  infraImportPath: string;
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

  const domainImportPath = getTsPath(tree, options.domainProject);
  const infraImportPath = getTsPath(tree, options.infrastructureProject);

  const isLib = tree
    .children(`${projectRoot}/src`)
    ?.some((child) => child === 'lib');

  const prefix = isLib ? 'lib' : 'app';
  const folderRoot = getFolderPath(sourceRoot, options.directory, `/${prefix}`);

  return {
    ...options,
    workspace: npmScope,
    projectRoot,
    domainImportPath,
    infraImportPath,
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

  const exports = new ExportStatementBuilder()
    .directory(options.directory)
    .fileNames([`${options.fileName}.controller`]);

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
    repoPropertyName: `${names(options.prismaModel).propertyName}Repo`,
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

  if (!options.skipFormat) {
    await formatFiles(tree);
  }
}
