import { Tree } from '@nrwl/devkit';
import { joinPathFragments } from '@nrwl/devkit';
import { removeChange } from '@nrwl/workspace/src/utilities/ast-utils';
import ts = require('typescript');

export function deleteFiles(
  tree: Tree,
  options: BaseLibNormalizedOptions
): void {
  const libFolderPath = joinPathFragments(options.projectRoot, 'src', 'lib');

  tree.children(libFolderPath).forEach((fileName) => {
    const filePath = joinPathFragments(libFolderPath, fileName);

    if (tree.isFile(filePath)) {
      tree.delete(filePath);
    }
  });

  if (!options.buildable && !options.publishable) {
    tree.delete(joinPathFragments(options.projectRoot, 'package.json'));
  }

  deleteBarrelFileContents(tree, options);
}

function deleteBarrelFileContents(
  tree: Tree,
  options: BaseLibNormalizedOptions
) {
  const indexPath = `${options.projectRoot}/src/index.ts`;
  const indexContent = tree.read(indexPath, 'utf-8') as string;
  let sourceFile = ts.createSourceFile(
    indexPath,
    indexContent,
    ts.ScriptTarget.Latest,
    true
  );

  sourceFile = removeChange(tree, sourceFile, indexPath, 0, sourceFile.text);
}
