import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private profileService : ProfileService,
              private authService : AuthService 
              ) { }

  ngOnInit(): void {
  }

  updateProfile( form ){
    
    let profile={
      FirstName : form.value.firstname,
      SecondName : form.value.secondname,
      Email : form.value.email,
      BloodGroup :form.value.bloodgroup,
      DateOfBirth : form.value.dateofbirth,
      DoorNo : form.value.doorno,
      Street:form.value.street,
      city :form.value.city,
      state : form.value.state,
      country : form.value.country,
      Zip :form.value.zip
    }

    this.profileService.addProfile(profile).subscribe(data =>{
      console.log(data);
    },err =>{
      console.log(err.message);
    });
  }

}
