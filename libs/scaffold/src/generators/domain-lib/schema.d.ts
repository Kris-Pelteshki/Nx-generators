interface DomainLibGeneratorSchema
  extends BaseGenerateLibSchema,
    Omit<DomainGeneratorSchema, 'projectName' | 'skipFormat'> {}

interface DomainNormalizedOptions extends BaseLibNormalizedOptions {}
