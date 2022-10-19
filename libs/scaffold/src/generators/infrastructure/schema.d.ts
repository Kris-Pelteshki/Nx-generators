interface InfraLibraryGeneratorOptions
  extends BaseGenerateLibSchema,
    Pick<RepositoryGeneratorSchema, 'prismaModel' | 'domainProject'> {}

interface InfraNormalizedOptions extends BaseLibNormalizedOptions {}
