import { Component, OnInit } from '@angular/core';
import { UserDto } from '../../shared/models/index';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users : Array<UserDto> = [];
  usersCloned : Array<UserDto> = [];
  txtValue : string = "";

  pageSize: number = 30;
  p: number = 1;
  total: number = 0;


  constructor(private _userService:UserService) {  }

  async ngOnInit() {

    //METODO CON AWAIT
    try {
      await this.setDataSet();
    } catch (error) {
      console.log(error);
    }



    //METODO CON PROMISE CLASSICA
/*    this._userService.getAll().then( (resp) => {
      this.users = resp;
      //clono array users dentro usersCloned
      this.usersCloned = [...this.users];
    }).catch();
*/

  }

  search(): void {
    //console.log(this.txtValue);
    this.users = this.usersCloned;

    if (!this.txtValue) {
      return;
    }

    this.users = this.users.filter(item => item.name.toLowerCase().indexOf(this.txtValue.toLowerCase()) > -1);

    //esempio uso di map
    let usersLight = this.users.map( (xx) => {
      return {
        fullname: `${xx.name} ${xx.surname}`,
        email : xx.email
      };
    });

  }

  /**
   * Page change event
   *
   * @param {number} event
   * @memberof UsersComponent
   */
  async pageChanged(event: number){

    try {
      let skip = (event -1) * this.pageSize;

      this.setDataSet(skip, this.pageSize).then( () => {
        this.p = event;
      });

    } catch (error) {
      console.log(error);
    }

  }


  private async setDataSet(skip:number=0, take:number=30) : Promise<Array<UserDto>>{


    return new Promise<Array<UserDto>>( async (resolve, reject) => {

      try {
        this.users = await this._userService.getAll(skip, this.pageSize);

        if(!this.users || this.users.length<=0){
          reject("Nessun user");
          return;
        }

        this.total = this.users && this.users.length > 0 ? this.users[0].count : 0;
        this.usersCloned = [...this.users];

        resolve(this.users);
      } catch (error) {
        reject(error);
      }

    });

  }

  editable(row: UserDto){
    this.users.forEach(xx => xx.edit = false);
    row.edit = true;
  }

}
