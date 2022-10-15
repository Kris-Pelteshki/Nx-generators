import { generateFiles, joinPathFragments, Tree } from '@nrwl/devkit';

type IConfig = {
  tree: Tree;
  rootPath: string;
  dirToPlaceFiles: string;
  templateOptions: Record<string, any>;
};

export class GenerateFilesBuilder {
  private _tree: Tree;
  private _rootPath: string;
  private _dirToPlaceFiles: string;
  private _templateOptions: Record<string, any>;
  private _filePaths: string[] = [];

  constructor(config: IConfig) {
    this._tree = config.tree;
    this._rootPath = config.rootPath;
    this._dirToPlaceFiles = config.dirToPlaceFiles;
    this._templateOptions = config.templateOptions;
  }

  /**
   * Adds the paths to the template files.
   *
   * ```js
   * .add('files/default')
   * .add({
   *   filePath: 'files/optional',
   *   condition: options.addOptionalFile
   * })
   * ```
   */
  add(arg: string | { folder: string; condition: boolean }) {
    if (typeof arg === 'string') {
      this._filePaths.push(arg);
      return this;
    }

    if (arg.condition) {
      this._filePaths.push(arg.folder);
    }
    return this;
  }

  generate() {
    this._filePaths.forEach((filePath) => {
      generateFiles(
        this._tree,
        joinPathFragments(this._rootPath, filePath),
        this._dirToPlaceFiles,
        this._templateOptions
      );
    });
  }
}
