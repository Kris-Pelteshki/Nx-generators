declare interface ControllerGeneratorSchema {
  prismaModel: string;
  project: string;
  directory?: string;
  domainProject: string;
  nestApplication: string;
  idType?: string;
  skipFormat?: boolean;
}
