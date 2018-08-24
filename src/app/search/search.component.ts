import { Component, OnInit } from '@angular/core';
import { ToastrService } from '../../../node_modules/ngx-toastr';
import { HttpService } from '../http.service';
import { Cookie } from '../../../node_modules/ng2-cookies';
import { Router } from '../../../node_modules/@angular/router';
import {HttpClient} from '@angular/common/http'
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

  public searchBox: any
  public repoList: any
  public userName: String
  public userID: String
  public history: any
  constructor(public toastr: ToastrService, public http:HttpClient,public httpService: HttpService, public router: Router) { }

  ngOnInit() 
  {
    this.userName = Cookie.get('userName')
    this.userID = Cookie.get('userID')
   
  }

  //Searching Repository Info On Github
  public searchRepo = () => {
    if (this.searchBox == '' || this.searchBox == undefined)
      this.toastr.warning("Enter The Language")
    else {
      this.httpService.searchGithub(this.searchBox).subscribe((receivedData: any) => {
        this.repoList = receivedData.items
        console.log(this.repoList)
      }, (error: any) => {
        console.log(error)
        this.toastr.error(error.status +" " +error.statusText)
      })
      let data={
        userID:this.userID,
        search:this.searchBox
      }
      console.log(data)
      this.http.post("http://gitback.solitarydev.online/api/v1/save",data).subscribe((data:any)=>{
        console.log(data)
        this.toastr.info("You Searched",data.data.search)
    },error=>{
        console.log(error)
      })
    }
  }

  //Getting All History

  public historyFunction = () => {
    this.httpService.getHistory(this.userID).subscribe((data: any) => {
      this.history = data.data
      if (this.history == null) {
        this.toastr.warning("No History")
      }
    }, (err) => {
      console.log("Error Occured")
    })
   
  }

  //Deleting History

  public deleteHistory = () => {
    this.httpService.deleteAllHistory(this.userID).subscribe((data) => {
      this.toastr.info("History Cleared")
      this.historyFunction()
    }, (err) => {
      this.toastr.error("Error Occured")
    })
  }

  public logout = () => {
    Cookie.delete('userName')
    Cookie.delete('userID')
    this.userName = ''
    this.userID = ''
    this.toastr.success("Logout Successfull")
    setTimeout(() => {
      this.router.navigate(['/login'])
    })
  }
}
