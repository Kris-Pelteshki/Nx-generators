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
import {
  getFolderPath,
  getTsPath,
  interfaceNames,
  updateBarrel,
} from '../../utils';

interface NormalizedSchema extends ApiClientGeneratorSchema {
  projectRoot: string;
  sourceRoot: string;
  folderRoot: string;
  domainImportPath: string;
  npmScope: string;
  fileName: string;
}

function normalizeOptions(
  tree: Tree,
  options: ApiClientGeneratorSchema
): NormalizedSchema {
  const { npmScope } = getWorkspaceLayout(tree);
  const { sourceRoot, root: projectRoot } = readProjectConfiguration(
    tree,
    options.projectName
  );
  const domainImportPath = getTsPath(tree, options.domainProject);
  const folderRoot = getFolderPath(sourceRoot, options.directory);

  return {
    ...options,
    npmScope: npmScope,
    projectRoot,
    sourceRoot,
    folderRoot,
    domainImportPath,
    fileName: names(options.prismaModel).fileName,
  };
}

function addFiles(tree: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    ...names(options.prismaModel),
    ...interfaceNames(options.prismaModel),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    template: '',
  };

  const clientTypeMap: Record<ApiClientGeneratorSchema['clientType'], string> =
    {
      axios: 'files/axios',
      fetch: 'files/fetch',
    };

  const filePath = clientTypeMap[options.clientType];

  generateFiles(
    tree,
    joinPathFragments(__dirname, filePath),
    options.folderRoot,
    templateOptions
  );
}

export default async function (tree: Tree, options: ApiClientGeneratorSchema) {
  const opts = normalizeOptions(tree, options);
  const { fileName, directory, projectName } = opts;

  addFiles(tree, opts);

  updateBarrel({
    tree,
    projectName,
    directory,
    exports: [`${fileName}.client`],
  });

  if (!options.skipFormat) {
    await formatFiles(tree);
  }
}
