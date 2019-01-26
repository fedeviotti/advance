import { EntityBase, IEntityBase } from './EntityBase';

export interface IProductDto extends IEntityBase{
  name: string;
  description: string;
  products:any[];
  totalCount: number;

}

export class ProductDto extends EntityBase implements IProductDto{

  constructor(value: Object = {}){
    super();
    Object.assign(value, this);
  }

  public name: string = "";
  public description: string = "";
  public products: any[];
  public totalCount: number = 0;
}
