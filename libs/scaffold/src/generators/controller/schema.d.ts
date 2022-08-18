export interface ControllerGeneratorSchema {
  prismaModel: string;
  project?: string;
  directory?: string;
  skipFormat?: boolean;
}
