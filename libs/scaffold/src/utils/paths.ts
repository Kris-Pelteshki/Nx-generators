import {
  Tree,
  getWorkspaceLayout,
  readProjectConfiguration,
} from '@nrwl/devkit';
import path = require('path');

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
  directoryPath?: string,
  pathPrefix = '/lib'
) {
  return directoryPath
    ? `${projectSourceRoot}${pathPrefix}/${directoryPath}`
    : projectSourceRoot + pathPrefix;
}

export function getAppFolderPath(
  projectSourceRoot: string,
  directoryPath?: string
) {
  return getFolderPath(projectSourceRoot, directoryPath, '/app');
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

/**
 * Searches for a file through parent directories
 */
export function getClosestPath(
  tree: Tree,
  absolutePath: string,
  patternToMatch: string | RegExp
): string {
  const parentDirectories = absolutePath.split('/');

  for (let index = 0; index < parentDirectories.length; index++) {
    const endIndex = -index || undefined;
    const directory = parentDirectories.slice(0, endIndex).join('/');

    const matchedFileName = tree.children(directory).find((child) => {
      return (
        child.match(patternToMatch) && tree.isFile(`${directory}/${child}`)
      );
    });

    if (matchedFileName) {
      return `${directory}/${matchedFileName}`;
    }
  }
}
