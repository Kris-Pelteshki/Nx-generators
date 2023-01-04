interface DomainGeneratorSchema {
  prismaModel: string;
  projectName: string;
  directory?: string;
  addRepoInterface?: boolean;
  addApiInterface?: boolean;
  idType?: string;
  skipFormat?: boolean;
}
