import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service'
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email: any
  public password: any
  constructor(public httpService: HttpService, public toastr: ToastrService, public router: Router) { }

  ngOnInit() {}


  public login = () => {
    if (!this.email) {
      this.toastr.warning("Email Is Missing")
    }
    else if (!this.password) {
      this.toastr.warning("Password Is Missing")
    }
    else {
      let data = {
        email: this.email,
        password: this.password
      }
      this.httpService.loginFunction(data).subscribe((result: any) => {
        if (result.code == 200) {
          this.toastr.success("Login Successfull")
          Cookie.set('userName', result.data.firstName + " " + result.data.lastName)
          Cookie.set('userID', result.data.userId)
          setTimeout(() => {
            this.router.navigate(['/search'])
          }, 1000)
        }
        else {
          this.toastr.error(result.message)
        }
      }, (err) => {
        this.toastr.error("Connection Problem")
      })
    }
  }
}
