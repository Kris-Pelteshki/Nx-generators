import {
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  names,
  readProjectConfiguration,
  Tree,
} from '@nrwl/devkit';
import * as path from 'path';
import {
  BarrelUpdater,
  ExportsBuilder,
  getFilePath,
  getFolderPath,
  getTsPath,
  interfaceNames,
  SourceFileHelper,
} from '../../utils';
import { addControllerToModule, addProviderToModule } from '../../utils/nest';
import { ControllerGeneratorSchema } from './schema';

interface NormalizedSchema extends ControllerGeneratorSchema {
  npmScope: string;
  projectRoot: string;
  domainImportPath: string;
  repoImportPath: string;
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

  const fileName = names(options.prismaModel).fileName;
  const domainImportPath = getTsPath(tree, options.domainProject);
  const folderRoot = getFolderPath(sourceRoot, options.directory, '/lib');
  const repoImportPath = `./${fileName}.repo`;

  return {
    ...options,
    npmScope: npmScope,
    projectRoot,
    domainImportPath,
    repoImportPath,
    sourceRoot,
    folderRoot,
    fileName,
  };
}

function updateBarrel(tree: Tree, options: NormalizedSchema) {
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
    template: '',
  };

  generateFiles(
    tree,
    path.join(__dirname, 'files'),
    options.folderRoot,
    templateOptions
  );

  const { sourceRoot: nestRoot } = readProjectConfiguration(
    tree,
    options.nestApplication
  );
  const appModulePath = getFilePath(tree, nestRoot, 'app.module.ts');

  if (appModulePath) {
    const { className } = names(options.prismaModel);
    const controllerName = `${className}Controller`;
    const repoName = `${className}Repo`;

    addControllerToModule(tree, appModulePath, controllerName);
    addProviderToModule(tree, appModulePath, repoName);

    const infraImportPath = getTsPath(tree, options.project);
    const appModuleFile = new SourceFileHelper(tree, appModulePath);

    appModuleFile.insertfImport(controllerName, infraImportPath);
    appModuleFile.insertfImport(repoName, infraImportPath);
  }
}

export default async function (tree: Tree, options: ControllerGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);

  addFiles(tree, normalizedOptions);
  updateBarrel(tree, normalizedOptions);

  if (!options.skipFormat) {
    await formatFiles(tree);
  }
}
