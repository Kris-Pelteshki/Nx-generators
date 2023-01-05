import {
  Tree,
  getWorkspaceLayout,
  readProjectConfiguration,
  getImportPath,
} from '@nrwl/devkit';

/**
 * Get the project import path for a project
 */
export function getTsPath(tree: Tree, projectName: string) {
  // TODO: read the path from base ts config file
  const { npmScope, libsDir } = getWorkspaceLayout(tree);
  let { root: projectDirectory } = readProjectConfiguration(tree, projectName);

  projectDirectory = projectDirectory.replace(`${libsDir}/`, '');

  return getImportPath(npmScope, projectDirectory);
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
 * Recursively searches for a matching file name in a directory.
 *
 * ```ts
 *  getFilePath(tree, 'libs/my-lib', 'my-file.ts');
 * ```
 */
export function getFilePath(
  tree: Tree,
  directory: string,
  fileName: string | RegExp
): string | undefined {
  const files = tree.children(directory);

  function getMatch(file: string): string | null {
    return file.match(fileName)?.[0];
  }

  for (const file of files) {
    if (getMatch(file)) {
      return `${directory}/${file}`;
    }

    if (!tree.isFile(`${directory}/${file}`)) {
      const filePath = getFilePath(tree, `${directory}/${file}`, fileName);

      if (filePath) {
        return filePath;
      }
    }
  }

  return undefined;
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
