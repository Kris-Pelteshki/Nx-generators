import { Tree, readProjectConfiguration, updateJson } from '@nrwl/devkit';

export function updateTsConfig(
  tree: Tree,
  options: IUpdateTsConfigOptions
): void {
  const project = readProjectConfiguration(tree, options.projectName);

  return updateJson(tree, `${project.root}/tsconfig.lib.json`, (json) => {
    json.compilerOptions.target = options.target;
    if (options.strict) {
      json.compilerOptions = {
        ...json.compilerOptions,
        strict: true,
        forceConsistentCasingInFileNames: true,
        noImplicitReturns: true,
        noFallthroughCasesInSwitch: true,
        noImplicitOverride: true,
        noPropertyAccessFromIndexSignature: true,
      };
    }

    return json;
  });
}
