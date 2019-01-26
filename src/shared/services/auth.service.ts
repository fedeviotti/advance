import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthVM } from '../models';
import { environment } from '../../environments/environment';
import { URLSearchParams } from '@angular/http';
import { LoginDataVM } from '../models/LoginDataVM';

@Injectable()
export class AuthService {

  constructor(private _http: HttpClient) { }

  /**
   * Login
   *
   * @param {LoginDataVM} data
   * @returns {Promise<AuthVM>}
   * @memberof AuthService
   */
  public async login (data: LoginDataVM) : Promise<AuthVM> {

    return new Promise<AuthVM>((resolve, reject) => {

      //creato nuovo headers
      let headers = new HttpHeaders;
      headers.append("Content-Type", "application/x-www-form-urlencoded");

      //creo il body di tipo application/x-www-form-urlencoded
      let body = new URLSearchParams();
      body.append("userName", data.userName);
      body.append("password", data.password);
      body.append("grant_type", data.grant_type);

      //serializzo tutto in una stringa
      let bodystring = body.toString();

      this._http.post<AuthVM>( environment.API_URL + `Token`,
                              bodystring,
                              { headers : headers })
                              .subscribe( (resp) => {

                                //se va bene setto la response con il token nel localstorage
                                localStorage.setItem("AuthData", JSON.stringify(resp));
                                resolve(resp);

                              }, (err) => {
                                reject(err);
                              });
    });

  }

  /**
   * logout
   *
   * @memberof AuthService
   */
  public logout(){
    localStorage.removeItem("AuthData");
  }

  /**
   * Metodo per verificare se utente è loggato
   *
   * @returns {boolean}
   * @memberof AuthService
   */
  public isLoggedIn() : boolean {
    let token = JSON.parse(localStorage.getItem("AuthData")) as AuthVM;
    return token && token.access_token ? true : false;
  }

}
