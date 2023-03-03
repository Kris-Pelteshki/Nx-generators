import {
  formatFiles,
  getWorkspaceLayout,
  joinPathFragments,
  names,
  Tree,
} from '@nrwl/devkit';
import { generateTemplateFiles, interfaceNames } from '../../utils';

interface NormalizedSchema extends DomainEntityGeneratorSchema {
  npmScope: string;
  fileName: string;
  prismaClientProperty: string;
}

function normalizeOptions(
  tree: Tree,
  options: DomainEntityGeneratorSchema
): NormalizedSchema {
  const { npmScope } = getWorkspaceLayout(tree);

  const prismaClientProperty = names(options.prismaModel).propertyName;
  const fileName = names(options.prismaModel).propertyName;

  return {
    ...options,
    npmScope,
    fileName,
    prismaClientProperty,
  };
}

export default async function (
  tree: Tree,
  options: DomainEntityGeneratorSchema
) {
  const opts = normalizeOptions(tree, options);
  const { fileName, projectName, directory } = opts;

  const templateOptions = {
    ...opts,
    ...names(options.prismaModel),
    ...interfaceNames(options.prismaModel),
    template: '',
  };

  const getPath = (filePath: string) => joinPathFragments(__dirname, filePath);

  generateTemplateFiles({
    tree,
    templateOptions,
    projectName,
    directory,
    files: [
      {
        path: getPath('files/common'),
        exports: [`${fileName}.models`],
      },
      {
        path: getPath('files/repo'),
        addOnlyIf: opts.addRepoInterface,
        exports: [`${fileName}.repo`],
      },
      {
        path: getPath('files/api'),
        addOnlyIf: opts.addApiInterface,
        exports: [`${fileName}.api`],
      },
    ],
  });

  if (!options.skipFormat) {
    await formatFiles(tree);
  }
}
