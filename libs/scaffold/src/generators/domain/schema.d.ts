export interface DomainGeneratorSchema {
  prismaModel: string;
  project: string;
  directory?: string;
  addRepoInterface?: boolean;
  addApiInterface?: boolean;
  skipFormat?: boolean;
}
