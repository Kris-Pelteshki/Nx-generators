import { Tree } from '@nrwl/devkit';
import { SourceFileHelper } from '../sourceFileHelper';
import {
  CONTROLLERS_ARRAY_IN_MODULE_DECORATOR,
  EXPORTS_ARRAY_IN_MODULE_DECORATOR,
  IMPORTS_ARRAY_IN_MODULE_DECORATOR,
  PROVIDERS_ARRAY_IN_MODULE_DECORATOR,
} from './selectors';

type AddStatementFn = (tree: Tree, filePath: string, statement: string) => void;
type AddToModuleDecoratorFn = (selector: string) => AddStatementFn;

export const addToModuleDecorator: AddToModuleDecoratorFn =
  (selector) => (tree, filePath, contentToInsert) => {
    const sourceFileHelper = new SourceFileHelper(tree, filePath);
    const [node] = sourceFileHelper.query(selector);

    if (!node) {
      throw new Error(
        `Could not find the AST node with the following selector: ${selector}`
      );
    }

    const hasItems = node.getChildCount() > 0;
    const position = node.end - 1;
    const content = hasItems ? `, ${contentToInsert}` : contentToInsert;

    sourceFileHelper.insertChange(position, content);
  };

export const addControllerToModule = addToModuleDecorator(
  CONTROLLERS_ARRAY_IN_MODULE_DECORATOR
);
export const addProviderToModule = addToModuleDecorator(
  PROVIDERS_ARRAY_IN_MODULE_DECORATOR
);
export const addImportToModule = addToModuleDecorator(
  IMPORTS_ARRAY_IN_MODULE_DECORATOR
);
export const addExportToModule = addToModuleDecorator(
  EXPORTS_ARRAY_IN_MODULE_DECORATOR
);
