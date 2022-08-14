import type { Tree } from '@nrwl/devkit';
import {
  addGlobal,
  removeChange,
} from '@nrwl/workspace/src/utilities/ast-utils';
import * as ts from 'typescript';
import type { NormalizedOptions } from '../schema';

export function addExportsToBarrelFile(
  tree: Tree,
  options: NormalizedOptions
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

  // export .repo.ts file from index
  sourceFile = addGlobal(
    tree,
    sourceFile,
    indexPath,
    `export * from './lib/${options.fileName}.repo';`
  );
}
