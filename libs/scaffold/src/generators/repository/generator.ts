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
  interfaceNames,
  updateBarrel,
  getTsPath,
  getFolderPath,
} from '../../utils';
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
  const fileName = prismaClientProperty;

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

function addFiles(tree: Tree, options: NormalizedSchema) {
  const { folderRoot, fileName } = options;

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
    folderRoot,
    templateOptions
  );

  if (options.unitTestRunner === 'none') {
    tree.delete(joinPathFragments(folderRoot, `${fileName}.repo.spec.ts`));
  }
}

export default async function (tree: Tree, options: RepositoryGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);

  addFiles(tree, normalizedOptions);

  updateBarrel({
    tree,
    options: normalizedOptions,
    exports: [`${normalizedOptions.fileName}.repo`],
  });

  if (!options.skipFormat) {
    await formatFiles(tree);
  }
}
