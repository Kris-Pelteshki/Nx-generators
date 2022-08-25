import type { Tree } from '@nrwl/devkit';
import { joinPathFragments } from '@nrwl/devkit';

export function deleteFiles(
  tree: Tree,
  options: BaseLibNormalizedOptions
): void {
  tree.delete(
    joinPathFragments(
      options.projectRoot,
      'src',
      'lib',
      `${options.projectName}.ts`
    )
  );

  if (options.unitTestRunner !== 'none') {
    tree.delete(
      joinPathFragments(
        options.projectRoot,
        'src',
        'lib',
        `${options.projectName}.spec.ts`
      )
    );
  }

  if (!options.buildable && !options.publishable) {
    tree.delete(joinPathFragments(options.projectRoot, 'package.json'));
  }
}