import type { Tree } from '@nrwl/devkit';
import {
  addGlobal,
  removeChange,
} from '@nrwl/workspace/src/utilities/ast-utils';
import * as ts from 'typescript';

export function addExportsToExportFile(
  tree: Tree,
  options: IExportFileOptions
): void {
  const indexPath = `${options.projectRoot}/src/index.ts`;
  const indexContent = tree.read(indexPath, 'utf-8') as string;
  let sourceFile = ts.createSourceFile(
    indexPath,
    indexContent,
    ts.ScriptTarget.Latest,
    true
  );

  sourceFile = removeChange(
    tree,
    sourceFile,
    indexPath,
    0,
    `export * from './lib/${options.projectName}';`
  );

  sourceFile = addGlobal(
    tree,
    sourceFile,
    indexPath,
    options.contentToAddToFile
  );
}
