import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthguardService implements CanActivate{

  constructor(private _authService: AuthService, private router: Router) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Promise<boolean>{

    return new Promise((resolve, reject) => {
      try {
        let isLogged = this._authService.isLoggedIn();

        if (!isLogged){
          this.router.navigate(['/login']);
          resolve(isLogged);
          return;
        }
        resolve(isLogged);

      } catch (error) {
        reject(error);
      }


    });
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Promise<boolean>{

    return new Promise((resolve, reject) => {
      try {
        let isLogged = this._authService.isLoggedIn();

        if (!isLogged){
          this.router.navigate(['/login']);
          resolve(isLogged);
          return;
        }
        resolve(isLogged);

      } catch (error) {
        reject(error);
      }


    });
  }



}
