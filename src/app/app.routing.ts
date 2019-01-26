import {RouterModule, Routes} from '@angular/router';
import { FullLayoutComponent } from './full-layout/full-layout.component';
import { UsersComponent } from './users/users.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { ProductsComponent } from './products/products.component';
import { AuthguardService } from '../shared/services/authguard.service';

export const routes : Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "prefix"
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "fulllayout",
    component: FullLayoutComponent,
    canActivateChild: [AuthguardService],
    children: [
      {
        path: "users",
        component: UsersComponent
      },
      {
        path: "user/:id",
        component: UserDetailComponent
      },
      {
        path: "products",
        component: ProductsComponent
      }
    ]
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
