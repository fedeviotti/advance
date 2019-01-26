import { EntityBase, IEntityBase } from './EntityBase';


export interface IUserDto extends IEntityBase{
   name: string;
   surname: string;
   email: string;
}


export class UserDto extends EntityBase implements IUserDto{

  constructor(value: Object = {}){
    super();
    Object.assign(value, this);
  }

  public name: string = "";
  public surname: string = "";
  public email: string = "";
}
