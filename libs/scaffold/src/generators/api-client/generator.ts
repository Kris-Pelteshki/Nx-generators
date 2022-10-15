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
  getFolderPath,
  getTsPath,
  interfaceNames,
} from '../../utils';
import { ApiClientGeneratorSchema } from './schema';

interface NormalizedSchema extends ApiClientGeneratorSchema {
  projectRoot: string;
  sourceRoot: string;
  folderRoot: string;
  domainImportPath: string;
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
  const domainImportPath = getTsPath(tree, options.domainProject);
  const folderRoot = getFolderPath(sourceRoot, options.directory);

  return {
    ...options,
    workspace: npmScope,
    projectRoot,
    sourceRoot,
    folderRoot,
    domainImportPath,
    fileName: names(options.prismaModel).fileName,
  };
}

function updateBarrel(tree: Tree, options: NormalizedSchema) {
  const exports = new ExportsBuilder()
    .directory(options.directory)
    .fileNames([`${options.fileName}.client`]);

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
