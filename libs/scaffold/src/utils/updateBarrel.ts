import { Tree } from '@nrwl/devkit';
import { BarrelUpdater } from './barrelUpdater';
import { ExportsBuilder } from './exportBuilder';

type Props = {
  tree: Tree;
  options: {
    projectRoot: string;
    directory?: string;
  };
  exports: string[];
};

export function updateBarrel(props: Props) {
  const { tree, options, exports } = props;

  const exportsBuilder = new ExportsBuilder()
    .directory(options.directory)
    .fileNames(exports);

  new BarrelUpdater({
    tree,
    indexPath: `${options.projectRoot}/src/index.ts`,
  })
    .add(exportsBuilder.build())
    .update();
}
