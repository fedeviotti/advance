import {Router} from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { LoginDataVM } from '../../shared/models/LoginDataVM';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  loginData : LoginDataVM = new LoginDataVM();

  constructor(private _router:Router,
              private _authService: AuthService,
              private _toaster:ToasterService) { }

  ngOnInit() {
  }

  async login(){

    try {
      var response = await this._authService.login(this.loginData);
      this._toaster.pop("info", "Benvenuto", response.userName);
      this._router.navigate(['fulllayout/users']);
    } catch (error) {
      this._toaster.pop("error", "Errore", error.error.message);
    }


  }

}
