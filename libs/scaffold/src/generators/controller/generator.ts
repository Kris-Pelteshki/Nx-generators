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
  ExportsBuilder,
  getClosestPath,
  getFolderPath,
  getTsPath,
  interfaceNames,
} from '../../utils';
import { addControllerToModule, addProviderToModule } from '../../utils/nest';
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

  const exports = new ExportsBuilder()
    .directory(options.directory)
    .fileNames([`${options.fileName}.controller`]);

  new BarrelUpdater({
    tree,
    indexPath: `${options.projectRoot}/src/index.ts`,
  })
    .add(exports.build())
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

  const appModulePath = getClosestPath(
    tree,
    options.folderRoot,
    'app.module.ts'
  );

  // TODO extract Controller name to utils
  // TODO: add a check to do this only if you know where to find app module
  addControllerToModule(
    tree,
    appModulePath,
    `${names(options.prismaModel).className}Controller`
  );

  addProviderToModule(
    tree,
    appModulePath,
    `${names(options.prismaModel).className}Repo`
  );

  //TODO:  add imports to files
}

export default async function (tree: Tree, options: ControllerGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);

  addFiles(tree, normalizedOptions);
  updateBarrel(tree, normalizedOptions);

  if (!options.skipFormat) {
    await formatFiles(tree);
  }
}
