export interface DomainGeneratorSchema extends BaseGenerateLibSchema {
  name: string;
  prismaModel: string;
  idType?: string;
  clientType: 'axios' | 'fetch';
  nestApplication: string;
}
