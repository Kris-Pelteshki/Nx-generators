interface DomainLibGeneratorSchema
  extends BaseGenerateLibSchema,
    Omit<DomainEntityGeneratorSchema, 'projectName' | 'skipFormat'> {}

interface DomainNormalizedOptions extends BaseLibNormalizedOptions {}
