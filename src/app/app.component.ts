import { Component, OnInit } from '@angular/core';
import { UserDto } from '../shared/models';
import { ToasterConfig } from "angular2-toaster/src/toaster-config";

@Component({
  selector: 'app-root',
  template: '<toaster-container [toasterconfig]="toasterconfig"></toaster-container><router-outlet></router-outlet>',
})
export class AppComponent implements OnInit{

  public toasterconfig : ToasterConfig =
  new ToasterConfig({
      showCloseButton: true,
      tapToDismiss: false,
      timeout: 0
  });

  constructor(){

  }

  ngOnInit(): void {

  }

}
