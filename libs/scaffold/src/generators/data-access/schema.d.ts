interface DataAccessGeneratorSchema
  extends BaseGenerateLibSchema,
    Omit<ApiClientGeneratorSchema, 'projectName' | 'skipFormat'> {}
