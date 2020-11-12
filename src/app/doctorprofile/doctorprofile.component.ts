import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocSearchResult } from '../models/docsearchresult';
import { DoctorProfileService } from '../services/doctor-profile.service';


@Component({
  selector: 'app-doctorprofile',
  templateUrl: './doctorprofile.component.html',
  styleUrls: ['./doctorprofile.component.css']
})
export class DoctorprofileComponent implements OnInit {

  doctorId : String;
  qualification : string=" ";
  specialization : string=" ";
  fullstar:number[];
  halfstar:boolean;
  emptystar:number[];
  today:string[];
  tomorrow:string[];
  dates:Date[]=[];
  temp=[0,1,2,3,4,5];
  clinicToday:string[]=[];
  timeSelected:string;
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


  constructor(private activatedRoute : ActivatedRoute,
              private doctorprofileService : DoctorProfileService,
              private router : Router) {  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params=>{
      this.doctorId=params.get('doctorId');
      this.doctorprofileService.getDoctorProfile(this.doctorId).subscribe(data =>{
        this.doctor=data;
        for(const ele of this.doctor.qualification){
            this.qualification+=ele+",";
        }
        this.qualification=this.qualification.substr(0,this.qualification.length-1);
        for(const ele of this.doctor.specialization){
          this.specialization+=ele+",";
        }
        this.specialization=this.specialization.substr(0,this.specialization.length-1);
        this.fullstar=Array(Math.floor(this.doctor.rating)).fill(1);
        this.halfstar=this.doctor.rating-Math.floor(this.doctor.rating) >= 0.5;
        this.emptystar=Array(5-this.fullstar.length-(this.halfstar==true? 1 : 0)).fill(1);
        this.today=this.doctor.videoavailability[0];
        this.tomorrow=this.doctor.videoavailability[1];
        this.clinicToday=this.doctor.clinicavailability[0];
        // console.log(this.today);
        let d=new Date();
        let i;
        for(i=1;i<=6;i++){
          let d1=new Date();
          d1.setDate(d.getDate()+i);
          this.dates.push(d1);
        }
      });
    });
  }

  videoToday(event:any){
    this.timeSelected=event.target.outerText;
    this.router.navigate(['appointment/'+this.doctorId],{queryParams:{
      consultType:'Video',
      consultDate:new Date(),
      consultTime:this.timeSelected
    }});
  }

  videoTom(event:any){
    this.timeSelected=event.target.outerText;
    let date=new Date();
    date.setDate(date.getDate()+1);
    this.router.navigate(['appointment/'+this.doctorId],{queryParams:{
      consultType:'Video',
      consultDate:date,
      consultTime:this.timeSelected
    }});
  }

  clinicBookToday(event:any){
    this.timeSelected=event.target.outerText;
    this.router.navigate(['appointment/'+this.doctorId],{queryParams:{
      consultType:'Clinic',
      consultDate:new Date(),
      consultTime:this.timeSelected
    }});
  }
  clinicBook(event:any,index){
    this.timeSelected=event.target.outerText;
    this.router.navigate(['appointment/'+this.doctorId],{queryParams:{
      consultType:'Clinic',
      consultDate:this.dates[index],
      consultTime:this.timeSelected
    }});
  }

}
