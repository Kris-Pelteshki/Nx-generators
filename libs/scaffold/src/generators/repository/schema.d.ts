export interface RepositoryGeneratorSchema {
  prismaModel: string;
  project: string;
  directory?: string;
  unitTestRunner?: 'jest' | 'none';
  skipFormat?: boolean;
}
