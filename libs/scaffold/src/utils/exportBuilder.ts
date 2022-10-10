import { getExportStatement } from './paths';

export class ExportStatementBuilder {
  private _fileNames: string[] = [];
  private _dir: string;
  private _pathPrefix: string;

  /**
   * The path prefix added for the library structure.
   *
   * Defaults to `./lib/`
   */
  pathPrefix(path: string) {
    this._pathPrefix = path;
    return this;
  }

  directory(dir: string) {
    this._dir = dir;
    return this;
  }

  fileNames(names: string[]) {
    this._fileNames = names;
    return this;
  }

  addFile(name: string) {
    this._fileNames.push(name);
    return this;
  }

  removeFile(name: string) {
    this._fileNames = this._fileNames.filter((fileName) => name !== fileName);
    return this;
  }

  build(): string {
    return this._fileNames
      .map((name) => getExportStatement(name, this._dir, this._pathPrefix))
      .join('\n');
  }
}
