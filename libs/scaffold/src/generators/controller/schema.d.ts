export interface ControllerGeneratorSchema {
  prismaModel: string;
  project: string;
  domainProject: string;
  infrastructureProject: string;
  directory?: string;
  idType?: string;
  skipFormat?: boolean;
}
