import { generateFiles, Tree } from '@nrwl/devkit';

type IConfig = {
  tree: Tree;
  dirToPlaceFiles: string;
  templateOptions: Record<string, any>;
};

export class GenerateFilesHelper {
  private _tree: Tree;
  private _dirToPlaceFiles: string;
  private _templateOptions: Record<string, any>;
  private _folders: string[] = [];

  constructor(config: IConfig) {
    this._tree = config.tree;
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
      this._folders.push(arg);
      return this;
    }

    if (arg.condition) {
      this._folders.push(arg.folder);
    }
    return this;
  }

  generate() {
    this._folders.forEach((folderPath) => {
      generateFiles(
        this._tree,
        folderPath,
        this._dirToPlaceFiles,
        this._templateOptions
      );
    });
  }
}
