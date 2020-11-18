import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../authentication/auth.service';
import { LoginService } from '../services/login.service';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  status;
  patientId;

  constructor(private loginSerivce : LoginService,
              private activatedRoute :ActivatedRoute
              ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params =>{
      this.patientId=params.get('patientId');
    });
  }


  updateProfile( form ){
    
    let profile={
      username :this.patientId,
      firstname : form.value.firstname,
      lastname : form.value.secondname,
      profileurl : form.value.avatar,
      email : form.value.email,
      bloodgroup :form.value.bloodgroup,
      dob : form.value.dateofbirth,
      address : form.value.doorno,
      city :form.value.city,
      state : form.value.state,
      country : form.value.country,
      zipcode :form.value.zip
    }
    this.loginSerivce.addProfile(profile).subscribe(data=>{
      this.status=data;
    });

  }

}
