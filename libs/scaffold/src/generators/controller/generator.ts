import {
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  joinPathFragments,
  names,
  readProjectConfiguration,
  Tree,
} from '@nrwl/devkit';
import {
  getFilePath,
  getFolderPath,
  getTsPath,
  interfaceNames,
  updateBarrel,
} from '../../utils';
import { addControllerToModule, addProviderToModule } from '../../utils/nest';

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

function addFiles(tree: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    ...names(options.prismaModel),
    ...interfaceNames(options.prismaModel),
    template: '',
  };

  generateFiles(
    tree,
    joinPathFragments(__dirname, 'files'),
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
    const infraImportPath = getTsPath(tree, options.project);

    addControllerToModule(tree, appModulePath, controllerName, infraImportPath);
    addProviderToModule(tree, appModulePath, repoName, infraImportPath);
  }
}

export default async function (tree: Tree, options: ControllerGeneratorSchema) {
  const opts = normalizeOptions(tree, options);
  const { fileName, directory, project } = opts;

  addFiles(tree, opts);

  updateBarrel({
    tree,
    projectName: project,
    directory,
    exports: [`${fileName}.controller`],
  });

  if (!options.skipFormat) {
    await formatFiles(tree);
  }
}
