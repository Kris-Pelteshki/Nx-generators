import type { Tree } from '@nrwl/devkit';
import {
  generateFiles,
  joinPathFragments,
  names,
  offsetFromRoot,
} from '@nrwl/devkit';
import type { NormalizedOptions } from '../schema';

export function createFiles(tree: Tree, options: NormalizedOptions): void {
  const substitutions = {
    ...options,
    ...names(options.projectName),
    tmpl: '',
    offsetFromRoot: offsetFromRoot(options.projectRoot),
  };

  // Generate repo.ts file
  generateFiles(
    tree,
    joinPathFragments(__dirname, '..', 'files', 'common'),
    options.projectRoot,
    substitutions
  );

  // delete repo.spec.ts file if testing option is turned off
  if (options.unitTestRunner === 'none') {
    tree.delete(
      joinPathFragments(
        options.projectRoot,
        'src',
        'lib',
        `${substitutions.fileName}.repo.spec.ts`
      )
    );
  }

  // TODO: give an option to remove mapper.ts file
  // if (options.service) {
  //   generateFiles(
  //     tree,
  //     joinPathFragments(__dirname, '..', 'files', 'service'),
  //     options.projectRoot,
  //     substitutions
  //   );

  //   if (options.unitTestRunner === 'none') {
  //     tree.delete(
  //       joinPathFragments(
  //         options.projectRoot,
  //         'src',
  //         'lib',
  //         `${substitutions.fileName}.service.spec.ts`
  //       )
  //     );
  //   }
  // }
}
