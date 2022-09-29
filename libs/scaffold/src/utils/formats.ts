import { names } from '@nrwl/devkit';

export function interfaceNames(name: string) {
  const { className } = names(name);

  const interfaceName = `I${className}`;
  const repoInterface = `I${className}Repo`;
  const apiInterface = `I${className}Api`;
  const createInterface = `ICreate${className}Dto`;
  const updateInterface = `IUpdate${className}Dto`;
  const createDto = `Create${className}Dto`;
  const updateDto = `Update${className}Dto`;

  return {
    prismaModel: className,
    interfaceName,
    repoInterface,
    apiInterface,
    createInterface,
    updateInterface,
    createDto,
    updateDto,
  };
}
