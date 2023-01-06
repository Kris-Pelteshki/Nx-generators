import { readProjectConfiguration, Tree } from '@nrwl/devkit';
import { BarrelUpdater } from './barrelUpdater';
import { ExportsBuilder } from './exportBuilder';

type Props = {
  tree: Tree;
  projectName: string;
  directory?: string;
  exports: Array<string | { import: string; condition: boolean }>;
};

export function updateBarrel(props: Props) {
  const { tree, projectName, directory, exports } = props;
  const { root: projectRoot } = readProjectConfiguration(tree, projectName);

  const exportsToAdd = exports.map((exp) => {
    if (typeof exp === 'string') {
      return exp;
    }

    if (exp.condition) {
      return exp.import;
    }
  });

  const exportsBuilder = new ExportsBuilder()
    .directory(directory)
    .fileNames(exportsToAdd);

  new BarrelUpdater({
    tree,
    indexPath: `${projectRoot}/src/index.ts`,
  })
    .add(exportsBuilder.build())
    .update();
}
