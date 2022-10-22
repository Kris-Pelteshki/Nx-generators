import { tsquery } from '@phenomnomnominal/tsquery';
import ts = require('typescript');
import { Tree } from '@nrwl/devkit';
import {
  insertChange,
  insertImport,
  removeChange,
  replaceChange,
} from '@nrwl/workspace/src/utilities/ast-utils';

export class SourceFileHelper {
  private _sourceFile: ts.SourceFile;

  constructor(private readonly tree: Tree, private readonly filePath: string) {
    this._createSourceFile();
  }

  private _createSourceFile() {
    const content = this.tree.read(this.filePath, 'utf-8');

    this._sourceFile = ts.createSourceFile(
      this.filePath,
      content,
      ts.ScriptTarget.Latest,
      true
    );
  }

  public get sourceFile() {
    return this._sourceFile;
  }

  public query(selector: string): ts.Node[] {
    return tsquery(this._sourceFile, selector);
  }

  public insertChange(insertPosition: number, contentToInsert: string) {
    this._sourceFile = insertChange(
      this.tree,
      this._sourceFile,
      this.filePath,
      insertPosition,
      contentToInsert
    );

    return this;
  }

  public replaceChange(
    insertPosition: number,
    contentToInsert: string,
    oldContent: string
  ) {
    this._sourceFile = replaceChange(
      this.tree,
      this._sourceFile,
      this.filePath,
      insertPosition,
      contentToInsert,
      oldContent
    );

    return this;
  }

  public removeChange(removePosition: number, contentToRemove: string) {
    this._sourceFile = removeChange(
      this.tree,
      this._sourceFile,
      this.filePath,
      removePosition,
      contentToRemove
    );

    return this;
  }

  public insertfImport(
    symbolName: string,
    fileName: string,
    isDefault?: boolean
  ) {
    this._sourceFile = insertImport(
      this.tree,
      this._sourceFile,
      this.filePath,
      symbolName,
      fileName,
      isDefault
    );

    return this;
  }
}
