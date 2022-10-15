import { Tree } from '@nrwl/devkit';
import { joinPathFragments } from '@nrwl/devkit';

export function deleteFiles(
  tree: Tree,
  options: BaseLibNormalizedOptions
): void {
  function pathAtLibDir(fileName: string): string {
    return joinPathFragments(options.projectRoot, 'src', 'lib', fileName);
  }

  tree.delete(pathAtLibDir(`${options.projectName}.ts`));

  if (options.unitTestRunner !== 'none') {
    tree.delete(pathAtLibDir(`${options.projectName}.spec.ts`));
  }

  if (!options.buildable && !options.publishable) {
    tree.delete(joinPathFragments(options.projectRoot, 'package.json'));
  }
}
