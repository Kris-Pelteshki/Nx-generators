import type { Tree } from '@nrwl/devkit';
import {
  getWorkspaceLayout,
  readProjectConfiguration,
  updateProjectConfiguration,
} from '@nrwl/devkit';

export function addProject(tree: Tree, options: IAddProjectOptions): void {
  if (!options.publishable && !options.buildable) {
    return;
  }

  const project = readProjectConfiguration(tree, options.projectName);

  if (project.targets) {
    const root = options.projectRoot;

    project.targets.build = {
      executor: '@nrwl/js:tsc',
      outputs: ['{options.outputPath}'],
      options: {
        outputPath: `dist/${getWorkspaceLayout(tree).libsDir}/${
          options.projectDirectory
        }`,
        tsConfig: `${root}/tsconfig.lib.json`,
        packageJson: `${root}/package.json`,
        main: `${root}/src/index.ts`,
        assets: [`${root}/*.md`],
      },
    };
  }
  updateProjectConfiguration(tree, options.projectName, project);
}
