import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorProfileService } from '../services/doctor-profile.service';
import { DocSearchResult } from '../models/docsearchresult';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent implements OnInit {

  doctorId:string;
  isVideo=true;
  consultType:string;
  consultDate:Date;
  consultTime:String;
  doctor:DocSearchResult={
    id : 0,
    name : " ",
    specialization : ["0"],
    experience :0,
    qualification : ["0"],
    location : " ",
    clinic : " ",
    description : " ",
    rating : 0,
    consultationfee : 0,
    isverified : false,
    videoavailability:[[]],
    clinicavailability:[[]]
  };
  qualification : string=" ";
  specialization : string=" ";


  constructor(private activatedRoute:ActivatedRoute,
              private profileService : DoctorProfileService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params =>{
      this.doctorId=params.get('doctorId');
      this.profileService.getDoctorProfile(this.doctorId).subscribe(docdata=>{
        this.doctor=docdata;
        for(const ele of this.doctor.qualification){
          this.qualification+=ele+",";
      }
      this.qualification=this.qualification.substr(0,this.qualification.length-1);
      for(const ele of this.doctor.specialization){
        this.specialization+=ele+",";
      }
      this.specialization=this.specialization.substr(0,this.specialization.length-1);
      })
      this.activatedRoute.queryParams.subscribe(queryParams=>{
        this.consultType=queryParams['consultType'];
        this.consultDate=queryParams['consultDate'];
        this.consultTime=queryParams['consultTime'];
      });
      this.isVideo=this.consultType=='Video';
    })
  }

}
