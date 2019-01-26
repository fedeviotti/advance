import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { AuthVM } from '../models/AuthVM';
import { Router } from '@angular/router';


@Injectable()
export class AuthinterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let request : HttpRequest<any>;
    const router = this.injector.get(Router);

    if (localStorage && localStorage.getItem("AuthData")){

      var auth = JSON.parse(localStorage.getItem("AuthData")) as AuthVM;
      //se non c'è il token continua nello stack di chiamata
      if (!auth || !auth.access_token) return next.handle(req);

      request = req.clone({ setHeaders : { Authorization: `Bearer ${auth.access_token}`}});

    }else{
      request = req.clone();
    }

    return next.handle(request).catch( (err: HttpErrorResponse) => {

      if (err.status == 401){
        //redirect su login in caso di errore 401
        router.navigate(["/login"]);
      }

      return Observable.throw(err);
    });

  }

}
