import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public email: any
  public password: any
  public firstName: any
  public lastName: any
  public phone: any

  constructor(public httpService: HttpService, public toastr: ToastrService, public router: Router) { }

  ngOnInit() {
  }

  public signUp = () => {
    if (!this.firstName) {
      this.toastr.warning("Enter Your First Name")
    }
    else if (!this.lastName) {
      this.toastr.warning("Enter Your Last Name")
    }
    else if (!this.email) {
      this.toastr.warning("Enter Your Email")
    }
    else if (!this.password) {
      this.toastr.warning("Enter Your Password")
    }
    else if (!this.phone) {
      this.toastr.warning("Enter Your Phone Number")
    }
    else {
      let data = {
        email: this.email,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
        phone: this.phone
      }
      this.httpService.signUpFunction(data).subscribe((result: any) => {
        if (result.code == 200) {
          this.toastr.success("Sign Up Successfull")
          setTimeout(() => {
            this.router.navigate(['/login'])
          }, 1000)
        }
        else
          this.toastr.error(result.message)
      }, (err) => {
        this.toastr.error("Connection Error")
      })
    }
  }

}
