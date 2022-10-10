import { Tree } from '@nrwl/devkit';
import { addGlobal } from '@nrwl/workspace/src/utilities/ast-utils';
import ts = require('typescript');

export class BarrelUpdater {
  private _tree: Tree;
  private _barrelPath: string;
  private _contentToAdd: string;

  constructor(tree: Tree) {
    this._tree = tree;
  }

  barrelPath(path: string) {
    this._barrelPath = path;
    return this;
  }

  contentToAdd(content: string) {
    this._contentToAdd = content;
    return this;
  }

  update() {
    const barrelContent = this._tree.read(this._barrelPath, 'utf-8');

    let sourceFile = ts.createSourceFile(
      this._barrelPath,
      barrelContent,
      ts.ScriptTarget.Latest,
      true
    );

    addGlobal(this._tree, sourceFile, this._barrelPath, this._contentToAdd);
  }
}
