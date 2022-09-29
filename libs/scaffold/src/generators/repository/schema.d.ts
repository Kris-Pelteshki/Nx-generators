export interface RepositoryGeneratorSchema {
  prismaModel: string;
  project: string;
  domainProject: string;
  directory?: string;
  unitTestRunner?: 'jest' | 'none';
  skipFormat?: boolean;

  // TODO:
  // add query file?: boolean = true
  // use observables?
  // add mapper file
}
