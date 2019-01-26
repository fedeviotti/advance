
export interface IEntityBase{
  id: number;
  count: number;
  edit: boolean;
}

export class EntityBase {

  public id: number;
  public count: number;
  public edit: boolean = false;

}
