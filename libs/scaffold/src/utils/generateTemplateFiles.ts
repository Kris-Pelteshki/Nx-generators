import { generateFiles, readProjectConfiguration, Tree } from '@nrwl/devkit';
import { ExportsBuilder } from './exportBuilder';
import { getFolderPath } from './paths';
import { SourceFileHelper } from './sourceFileHelper';

type FileTemplate = {
  /** Path to the template file. */
  path: string;
  /** the names of the file exports to add to the project's barrel file */
  exports?: string[];
  /** Controls if the template should be added, or not.
   * Useful for optional files
   */
  addOnlyIf?: boolean;
};

type GenerateFilesProps = {
  tree: Tree;
  /** Options to pass to the template. */
  templateOptions: Record<string, any>;
  /** Name of the project where the files should be generated. */
  projectName: string;
  /**
   * (Optional) - Directory path relative to the project (project name) where the files will be generated
   *
   * ---
   *
   * Example:
   * ```
   * project name: `my-lib`
   * directory: `test`
   * ```
   *
   * Generated files will be placed in `libs/my-lib/src/lib/test`
   */
  directory: string;
  /** Array of file templates to generate. */
  files: FileTemplate[];
};

export const generateTemplateFiles = ({
  tree,
  templateOptions,
  projectName,
  directory,
  files,
}: GenerateFilesProps) => {
  const { sourceRoot, root: projectRoot } = readProjectConfiguration(
    tree,
    projectName
  );
  const destinationDirectoryPath = getFolderPath(sourceRoot, directory);
  const exports = new ExportsBuilder().directory(directory);

  files.forEach((file) => {
    const shouldGenerateFile = file.addOnlyIf === undefined || file.addOnlyIf;

    if (shouldGenerateFile) {
      generateFiles(tree, file.path, destinationDirectoryPath, templateOptions);

      if (file.exports) {
        exports.addFile(...file.exports);
      }
    }
  });

  const barrelFilePath = `${projectRoot}/src/index.ts`;
  const barrelSourceFile = new SourceFileHelper(tree, barrelFilePath);
  barrelSourceFile.addGlobal(exports.build());
};
