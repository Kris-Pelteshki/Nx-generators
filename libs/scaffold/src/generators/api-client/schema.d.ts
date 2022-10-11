export interface ApiClientGeneratorSchema {
  prismaModel: string;
  project: string;
  domainProject: string;
  directory?: string;
  useAxios?: boolean;
  skipFormat?: boolean;
}
