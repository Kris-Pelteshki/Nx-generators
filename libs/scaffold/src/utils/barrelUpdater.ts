import { Tree } from '@nrwl/devkit';
import { addGlobal } from '@nrwl/workspace/src/utilities/ast-utils';
import ts = require('typescript');

export class BarrelUpdater {
  private _tree: Tree;
  private _indexPath: string;
  private _contentToAdd: string[] = [];

  constructor({ tree, indexPath }: { tree: Tree; indexPath: string }) {
    this._tree = tree;
    this._indexPath = indexPath;
  }

  add(content: string) {
    this._contentToAdd.push(content);
    return this;
  }

  update() {
    const barrelContent = this._tree.read(this._indexPath, 'utf-8');

    let sourceFile = ts.createSourceFile(
      this._indexPath,
      barrelContent,
      ts.ScriptTarget.Latest,
      true
    );

    const contentSeparatedByNewLine = this._contentToAdd.join('\n');

    addGlobal(
      this._tree,
      sourceFile,
      this._indexPath,
      contentSeparatedByNewLine
    );

    return this;
  }
}
