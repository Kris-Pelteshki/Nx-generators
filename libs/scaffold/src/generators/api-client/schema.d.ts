export interface ApiClientGeneratorSchema {
  prismaModel: string;
  project?: string;
  directory?: string;
  skipFormat?: boolean;
}
