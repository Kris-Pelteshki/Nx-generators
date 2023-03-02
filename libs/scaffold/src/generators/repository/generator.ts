import {
  formatFiles,
  getWorkspaceLayout,
  joinPathFragments,
  names,
  readProjectConfiguration,
  Tree,
} from '@nrwl/devkit';
import {
  interfaceNames,
  getTsPath,
  getFolderPath,
  generateTemplateFiles,
} from '../../utils';

interface NormalizedSchema extends RepositoryGeneratorSchema {
  folderRoot: string;
  npmScope: string;
  fileName: string;
  prismaClientProperty: string;
  domainImportPath: string;
}

function normalizeOptions(
  tree: Tree,
  options: RepositoryGeneratorSchema
): NormalizedSchema {
  const { npmScope } = getWorkspaceLayout(tree);
  const { sourceRoot } = readProjectConfiguration(tree, options.project);
  const domainImportPath = getTsPath(tree, options.domainProject);
  const folderRoot = getFolderPath(sourceRoot, options.directory);

  const prismaClientProperty = names(options.prismaModel).propertyName;
  const fileName = prismaClientProperty;

  return {
    ...options,
    npmScope: npmScope,
    folderRoot,
    fileName,
    prismaClientProperty,
    domainImportPath,
  };
}

export default async function (
  tree: Tree,
  rawOptions: RepositoryGeneratorSchema
) {
  const options = normalizeOptions(tree, rawOptions);
  const { project, directory } = options;

  const templateOptions = {
    ...options,
    ...names(options.prismaModel),
    ...interfaceNames(options.prismaModel),
    tmpl: '',
  };

  generateTemplateFiles({
    tree,
    templateOptions,
    projectName: project,
    directory,
    files: [
      {
        path: joinPathFragments(__dirname, 'files'),
        exports: [`${options.fileName}.repo`],
      },
    ],
  });

  if (options.unitTestRunner === 'none') {
    tree.delete(
      joinPathFragments(options.folderRoot, `${options.fileName}.repo.spec.ts`)
    );
  }

  if (!options.skipFormat) {
    await formatFiles(tree);
  }
}
