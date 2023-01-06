interface InfraLibraryGeneratorOptions
  extends BaseGenerateLibSchema,
    Pick<RepositoryGeneratorSchema, 'prismaModel' | 'domainProject'>,
    Pick<ControllerGeneratorSchema, 'idType' | 'nestApplication'> {}

interface InfraNormalizedOptions extends BaseLibNormalizedOptions {}
