import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {RouterModule,Router} from '@angular/router';
import { HttpService } from './http.service';
import {ToastrModule} from 'ngx-toastr'
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {FormsModule} from '@angular/forms';
import { SearchComponent } from './search/search.component'


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
    {path:'login',component:LoginComponent},
    {path:'signup',component:SignupComponent},
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'search',component:SearchComponent}
    ]),
    ToastrModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule

  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
