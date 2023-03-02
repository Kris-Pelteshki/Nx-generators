import {
  formatFiles,
  getWorkspaceLayout,
  joinPathFragments,
  names,
  readProjectConfiguration,
  Tree,
} from '@nrwl/devkit';
import {
  generateTemplateFiles,
  getFilePath,
  getTsPath,
  interfaceNames,
} from '../../utils';
import { addControllerToModule, addProviderToModule } from '../../utils/nest';

interface NormalizedSchema extends ControllerGeneratorSchema {
  npmScope: string;
  domainImportPath: string;
  repoImportPath: string;
  fileName: string;
}

function normalizeOptions(
  tree: Tree,
  options: ControllerGeneratorSchema
): NormalizedSchema {
  const { npmScope } = getWorkspaceLayout(tree);
  const fileName = names(options.prismaModel).fileName;

  return {
    ...options,
    npmScope,
    fileName,
    domainImportPath: getTsPath(tree, options.domainProject),
    repoImportPath: `./${fileName}.repo`,
  };
}

function updateNestModule(tree: Tree, options: NormalizedSchema) {
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

export default async function (
  tree: Tree,
  rawOptions: ControllerGeneratorSchema
) {
  const options = normalizeOptions(tree, rawOptions);
  const { fileName, directory, project } = options;

  const templateOptions = {
    ...options,
    ...names(options.prismaModel),
    ...interfaceNames(options.prismaModel),
    template: '',
  };

  generateTemplateFiles({
    tree,
    templateOptions,
    projectName: project,
    directory,
    files: [
      {
        path: joinPathFragments(__dirname, 'files'),
        exports: [`${fileName}.controller`],
      },
    ],
  });

  updateNestModule(tree, options);

  if (!options.skipFormat) {
    await formatFiles(tree);
  }
}
