import {
  formatFiles,
  getWorkspaceLayout,
  names,
  offsetFromRoot,
  readProjectConfiguration,
  Tree,
} from '@nrwl/devkit';
import path = require('path');
import {
  BarrelUpdater,
  ExportsBuilder,
  GenerateFilesHelper,
  getFolderPath,
  interfaceNames,
} from '../../utils';

interface NormalizedSchema extends DomainGeneratorSchema {
  projectRoot: string;
  sourceRoot: string;
  folderRoot: string;
  workspace: string;
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
    workspace: npmScope,
    projectRoot,
    sourceRoot,
    folderRoot,
    fileName,
    prismaClientProperty,
  };
}

function updateBarrel(tree: Tree, options: NormalizedSchema) {
  const exports = new ExportsBuilder()
    .directory(options.directory)
    .fileNames([`${options.fileName}.models`]);

  if (options.addRepoInterface) {
    exports.addFile(`${options.fileName}.repo`);
  }

  if (options.addApiInterface) {
    exports.addFile(`${options.fileName}.api`);
  }

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

  const getPath = (filePath: string) => path.join(__dirname, filePath);

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
  const normalizedOptions = normalizeOptions(tree, options);

  addFiles(tree, normalizedOptions);
  updateBarrel(tree, normalizedOptions);

  if (!options.skipFormat) {
    await formatFiles(tree);
  }
}
