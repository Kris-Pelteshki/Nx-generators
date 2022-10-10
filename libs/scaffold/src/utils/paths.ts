import {
  Tree,
  getWorkspaceLayout,
  readProjectConfiguration,
} from '@nrwl/devkit';

/**
 * Get the project import path for a project
 */
export function getTsPath(tree: Tree, projectName: string) {
  // TODO: read the path from base ts config file
  const { npmScope, libsDir } = getWorkspaceLayout(tree);

  let { root } = readProjectConfiguration(tree, projectName);

  root = root.replace(`${libsDir}/`, '');

  return `@${npmScope}/${root}`;
}

export function getFolderPath(
  projectSourceRoot: string,
  directoryPath?: string
) {
  return directoryPath
    ? `${projectSourceRoot}/lib/${directoryPath}`
    : `${projectSourceRoot}/lib`;
}

export function getFilePathRelativeToProjectRoot(
  fileName: string,
  directoryPath?: string,
  pathPrefix = './lib/'
) {
  return directoryPath
    ? `${pathPrefix}${directoryPath}/${fileName}`
    : `${pathPrefix}${fileName}`;
}

export function getExportStatement(
  fileName: string,
  directoryPath?: string,
  pathPrefix?: string
) {
  const filePath = getFilePathRelativeToProjectRoot(
    fileName,
    directoryPath,
    pathPrefix
  );

  return `export * from '${filePath}';`;
}
