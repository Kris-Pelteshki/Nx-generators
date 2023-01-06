import type { Schema } from '@nrwl/workspace/src/generators/library/schema';

export function toLibraryGeneratorOptions(
  options: BaseGenerateLibSchema
): Schema {
  return {
    ...options,
    skipFormat: true,
  };
}
