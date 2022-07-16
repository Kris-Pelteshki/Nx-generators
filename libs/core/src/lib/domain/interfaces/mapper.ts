export interface IMapper<DomainModel, DbModel> {
  toDomain(raw: DbModel): DomainModel;
  toPersistence(entity: DomainModel): DbModel;
}
