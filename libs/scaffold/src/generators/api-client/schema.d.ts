interface ApiClientGeneratorSchema {
  prismaModel: string;
  projectName: string;
  domainProject: string;
  directory?: string;
  clientType: 'axios' | 'fetch';
  idType?: string;
  skipFormat?: boolean;
}
