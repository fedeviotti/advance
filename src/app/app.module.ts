import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { FilterPipe } from '../shared/pipes/filter.pipe';
import { FullLayoutComponent } from './full-layout/full-layout.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app.routing';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserService } from '../shared/services/user.service';
import { ToasterModule } from 'angular2-toaster';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '../shared/services/auth.service';
import { AuthinterceptorService } from '../shared/services/authinterceptor.service';
import { AuthguardService } from '../shared/services/authguard.service';
import { ProductsComponent } from './products/products.component';
import { ProductService } from '../shared/services/product.service';

@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    FullLayoutComponent,
    UsersComponent,
    LoginComponent,
    UserDetailComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    ToasterModule,
    BrowserAnimationsModule
  ],
  providers: [
    UserService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthinterceptorService,
      multi: true
    },
    AuthguardService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
