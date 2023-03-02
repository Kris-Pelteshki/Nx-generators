import {
  formatFiles,
  getWorkspaceLayout,
  joinPathFragments,
  names,
  Tree,
} from '@nrwl/devkit';
import { generateTemplateFiles, getTsPath, interfaceNames } from '../../utils';

interface NormalizedSchema extends ApiClientGeneratorSchema {
  domainImportPath: string;
  npmScope: string;
  fileName: string;
}

function normalizeOptions(
  tree: Tree,
  options: ApiClientGeneratorSchema
): NormalizedSchema {
  const { npmScope } = getWorkspaceLayout(tree);

  return {
    ...options,
    npmScope,
    domainImportPath: getTsPath(tree, options.domainProject),
    fileName: names(options.prismaModel).fileName,
  };
}

export default async function (
  tree: Tree,
  rawOptions: ApiClientGeneratorSchema
) {
  const options = normalizeOptions(tree, rawOptions);
  const { fileName, directory, projectName } = options;

  const templateOptions = {
    ...options,
    ...names(options.prismaModel),
    ...interfaceNames(options.prismaModel),
    template: '',
  };

  const clientTypeMap: Record<ApiClientGeneratorSchema['clientType'], string> =
    {
      axios: 'files/axios',
      fetch: 'files/fetch',
    };

  const filePath = clientTypeMap[options.clientType];

  generateTemplateFiles({
    tree,
    templateOptions,
    projectName,
    directory,
    files: [
      {
        path: joinPathFragments(__dirname, filePath),
        exports: [`${fileName}.client`],
      },
    ],
  });

  if (!options.skipFormat) {
    await formatFiles(tree);
  }
}
