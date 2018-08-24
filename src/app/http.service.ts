import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public baseURL = "http://gitback.solitarydev.online/api/v1"

  constructor(public http: HttpClient) { 
  }

  //Login Function:

  public loginFunction = (data) => {
    const params = new HttpParams()
      .set('email', data.email)
      .set('password', data.password)
    return this.http.post(`${this.baseURL}/login`, params)
  }

  //Sign Up Function:

  public signUpFunction = (data) => {
    const params = new HttpParams()
      .set('email', data.email)
      .set('password', data.password)
      .set('firstName', data.firstName)
      .set('lastName', data.lastName)
      .set('phone', data.phone)
    return this.http.post(`${this.baseURL}/signup`, params)
  }

  //Searching Repo On Github:

  public searchGithub=(language)=>{
  return this.http.get('https://api.github.com/search/repositories?q=language:'+language)
  }

  //Getting History:

  public getHistory=(id)=>{
    return this.http.get(`${this.baseURL}/history/`+id)
  }

  //Deleting History:

  public deleteAllHistory=(id)=>{
   return this.http.delete(`${this.baseURL}/del/`+id)
  }

}
