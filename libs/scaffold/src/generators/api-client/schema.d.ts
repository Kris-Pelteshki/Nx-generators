export interface ApiClientGeneratorSchema {
  prismaModel: string;
  project: string;
  directory?: string;
  useAxios?: boolean;
  skipFormat?: boolean;
}
