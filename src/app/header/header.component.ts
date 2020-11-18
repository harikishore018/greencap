import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { SearchService } from '../services/search.service';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthenticated ;
  private userSub : Subscription;
  locations : String;
  specializations : String;
  userCreds;
  selectedSpec: string = 'All Doctors';
  selectedLocation: string = 'All Locations';
  //user:User;

  constructor(private loginService:LoginService,
              private searchService : SearchService ,
              private router : Router

              ) { }

  ngOnInit(): void {

    this.userCreds=localStorage.getItem('userData');
    if(localStorage.getItem('userData')===null){
      this.isAuthenticated=false;
    }
    else{
      this.isAuthenticated=true;
    }
    console.log(this.userCreds);

    this.searchService.getLocations().subscribe( data => {
      this.locations=data;
    });

    this.searchService.getSpecializations().subscribe( data => {
      this.specializations=data;
    });
    
    // this.userSub=this.authService.user.subscribe(user=>{
    //   this.isAuthenticated=!!user;
    //   //this.user=user;
    // });
  }

  // onLogout(){
  //   this.authService.logout();
  // }

  // ngOnDestroy():void {
  //   this.userSub.unsubscribe();
  // }

  //event handler for the select element's change event
  selectSpecHandler (event: any) {
    this.selectedSpec = event.target.value;
  }
  selectLocationHandler (event: any) {
    this.selectedLocation = event.target.value;
  }

  fetchDoctors(){
    this.router.navigate(['/searchresults'],{ queryParams: { 'specialization': this.selectedSpec ,'location': this.selectedLocation} });
  }

  displayName(){
    return JSON.parse(localStorage.getItem("userData")).username;
  } 




}
