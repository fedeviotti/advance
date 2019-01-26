import { UserDto } from '../../shared/models/UserDto';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { ToasterModule, ToasterService } from 'angular2-toaster';



@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserDetailComponent implements OnInit {

  public user : UserDto = new UserDto();
  private idUser:number;
  private toasterService: ToasterService;


  constructor(private _route:ActivatedRoute,
              private _userService:UserService,
              private _router: Router,
              private _toaster: ToasterService ) {  }

  async ngOnInit() {

    this._route.params.subscribe( async (param) =>{
      this.idUser = param["id"];
      this.user = await this._userService.getById(this.idUser);
    });
  }

  update(): void {

    var resp = this._userService.update(this.user).then( (resolve) => {
      this._toaster.pop('success', 'Successo', "Utente aggiornato");
      this._router.navigate(['fulllayout/users']);
    }).catch( (reject) => {
      this._toaster.pop('error', 'Errore', reject.error.message);
    });

  }

}
