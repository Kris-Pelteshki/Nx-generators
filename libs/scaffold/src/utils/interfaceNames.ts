import { names } from '@nrwl/devkit';

export function interfaceNames(name: string) {
  const { className, propertyName } = names(name);

  return {
    prismaModel: className,
    interfaceName: `I${className}`,
    repoInterface: `I${className}Repo`,
    repoName: `${className}Repo`,
    repoPropertyName: `${propertyName}Repo`,
    apiInterface: `I${className}Api`,
    createInterface: `ICreate${className}Dto`,
    updateInterface: `IUpdate${className}Dto`,
    createDto: `Create${className}Dto`,
    updateDto: `Update${className}Dto`,
  };
}
