import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { SearchService } from '../services/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit , OnDestroy{

  isAuthenticated =false;
  private userSub : Subscription;
  locations : String;
  specializations : String;
  selectedSpec: string = 'All Doctors';
  selectedLocation: string = 'All Locations';
  //user:User;

  constructor(private authService : AuthService,
              private searchService : SearchService ,
              private router : Router
              ) { }

  ngOnInit(): void {
    this.searchService.getLocations().subscribe( data => {
      this.locations=data;
    });

    this.searchService.getSpecializations().subscribe( data => {
      this.specializations=data;
    });
    
    this.userSub=this.authService.user.subscribe(user=>{
      this.isAuthenticated=!!user;
      //this.user=user;
    });
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy():void {
    this.userSub.unsubscribe();
  }

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




}
