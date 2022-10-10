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
import * as path from 'path';
import {
  BarrelUpdater,
  ExportStatementBuilder,
  interfaceNames,
} from '../../utils';
import { getTsPath, getFolderPath } from '../../utils/paths';
import { RepositoryGeneratorSchema } from './schema';

interface NormalizedSchema extends RepositoryGeneratorSchema {
  projectRoot: string;
  sourceRoot: string;
  folderRoot: string;
  workspace: string;
  fileName: string;
  prismaClientProperty: string;
  domainImportPath: string;
}

function normalizeOptions(
  tree: Tree,
  options: RepositoryGeneratorSchema
): NormalizedSchema {
  const { npmScope } = getWorkspaceLayout(tree);
  const { sourceRoot, root: projectRoot } = readProjectConfiguration(
    tree,
    options.project
  );
  const domainImportPath = getTsPath(tree, options.domainProject);
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
    domainImportPath,
  };
}

function updateBarrel(tree: Tree, options: NormalizedSchema) {
  const exports = new ExportStatementBuilder()
    .directory(options.directory)
    .fileNames([`${options.fileName}.repo`]);

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
    tmpl: '',
  };

  generateFiles(
    tree,
    path.join(__dirname, 'files'),
    options.folderRoot,
    templateOptions
  );

  if (options.unitTestRunner === 'none') {
    tree.delete(
      joinPathFragments(options.folderRoot, `${options.fileName}.repo.spec.ts`)
    );
  }
}

export default async function (tree: Tree, options: RepositoryGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);

  addFiles(tree, normalizedOptions);
  updateBarrel(tree, normalizedOptions);

  if (!options.skipFormat) {
    await formatFiles(tree);
  }
}
