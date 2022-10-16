interface LibraryGeneratorOptions
  extends BaseGenerateLibSchema,
    Pick<RepositoryGeneratorSchema, 'prismaModel' | 'domainProject'> {}

interface NormalizedOptions extends BaseLibNormalizedOptions {}
