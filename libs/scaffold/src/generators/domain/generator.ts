import {
  formatFiles,
  getWorkspaceLayout,
  joinPathFragments,
  names,
  offsetFromRoot,
  readProjectConfiguration,
  Tree,
} from '@nrwl/devkit';
import {
  GenerateFilesHelper,
  getFolderPath,
  interfaceNames,
  updateBarrel,
} from '../../utils';

interface NormalizedSchema extends DomainGeneratorSchema {
  projectRoot: string;
  sourceRoot: string;
  folderRoot: string;
  npmScope: string;
  fileName: string;
  prismaClientProperty: string;
}

function normalizeOptions(
  tree: Tree,
  options: DomainGeneratorSchema
): NormalizedSchema {
  const { npmScope } = getWorkspaceLayout(tree);
  const { sourceRoot, root: projectRoot } = readProjectConfiguration(
    tree,
    options.projectName
  );
  const folderRoot = getFolderPath(sourceRoot, options.directory);

  const prismaClientProperty = names(options.prismaModel).propertyName;
  const fileName = names(options.prismaModel).propertyName;

  return {
    ...options,
    npmScope,
    projectRoot,
    sourceRoot,
    folderRoot,
    fileName,
    prismaClientProperty,
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

  const getPath = (filePath: string) => joinPathFragments(__dirname, filePath);

  new GenerateFilesHelper({
    tree,
    templateOptions,
    dirToPlaceFiles: options.folderRoot,
  })
    .add(getPath('files/common'))
    .add({
      folder: getPath('files/repo'),
      condition: options.addRepoInterface,
    })
    .add({
      folder: getPath('files/api'),
      condition: options.addApiInterface,
    })
    .generate();
}

export default async function (tree: Tree, options: DomainGeneratorSchema) {
  const opts = normalizeOptions(tree, options);
  const { fileName, projectName, directory } = opts;

  addFiles(tree, opts);

  updateBarrel({
    tree,
    projectName,
    directory,
    exports: [
      `${fileName}.models`,
      {
        condition: opts.addRepoInterface,
        import: `${fileName}.repo`,
      },
      {
        condition: opts.addApiInterface,
        import: `${fileName}.api`,
      },
    ],
  });

  if (!options.skipFormat) {
    await formatFiles(tree);
  }
}
