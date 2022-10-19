interface ApiClientGeneratorSchema {
  prismaModel: string;
  projectName: string;
  domainProject: string;
  directory?: string;
  clientType: 'axios' | 'fetch';
  skipFormat?: boolean;
}
