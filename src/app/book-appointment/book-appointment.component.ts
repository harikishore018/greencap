import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorProfileService } from '../services/doctor-profile.service';
import { doctorProfile } from '../models/doctorprofile';
import { AppointmentPost } from '../models/appointmentpost';
import { DatePipe } from '@angular/common';
import { BookappointmentService } from '../services/bookappointment.service';


@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent implements OnInit {

  pipe = new DatePipe('en-US');
  confirmation:boolean;
  doctorId:string;
  appointmentStatus:string;
  isVideo=true;
  consultType:string;
  consultDate:Date;
  consultTime:String;
  doctor:doctorProfile={
    id:"",
    name:"",
    bio:"",
    profileurl:"",
    specialisation:"",
    qualification:"",
    experience:"",
    phno:"",
    address:"",
    city:"", 
    clinic:"",
    reviews:[],
    ratings:[],
    totalRating:0,
    availableslots:[[]],
    clinicslots:[
      [],
      [1300,1200,100],
      [1300,1200,100],
      [1300,1200,100],
      [1300,1200,100],
      [1300,1200,100],
      [1300,1200,100]
  ]
  };
  qualification : string=" ";
  specialization : string=" ";



  constructor(private activatedRoute:ActivatedRoute,
              private profileService : DoctorProfileService,
              private appointmentService : BookappointmentService,
              private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params =>{
      this.doctorId=params.get('doctorId');
      this.profileService.getDoctorProfile(this.doctorId).subscribe(docdata=>{
        this.doctor=docdata;
      this.qualification=docdata.qualification;
      this.specialization=docdata.specialisation;
      })
      this.activatedRoute.queryParams.subscribe(queryParams=>{
        this.consultType=queryParams['consultType'];
        this.consultDate=queryParams['consultDate'];
        this.consultTime=queryParams['consultTime'];
      });
      this.isVideo=this.consultType=='Video';
    })
  }

  onSubmit(form){
    let date=this.pipe.transform(this.consultDate, 'dd/MM/yyyy');
    date=date.replace('/','');
    date=date.replace('/','');
    let time="";
    if(this.consultTime.localeCompare("12:00 AM")==0)
      time="2400";
    else if(this.consultTime.localeCompare("12:00 PM")==0)
      time="1200";
    else{
      let n=this.consultTime.length;
      let am;
      let flag;
      if(n==7)  am= this.consultTime.substring(4,7);
      else  am= this.consultTime.substring(5,7);
      if(am.localeCompare(" AM")==0) flag=false;
      else flag=true;
      let hr;
      if(n==7) hr=parseInt(this.consultTime.substring(0,1));
      else hr=parseInt(this.consultTime.substring(0,2));
      if(!flag){
        hr%=12;
        time+=String(hr);
        if(n==7) time+=this.consultTime.substring(2,4);
        else time+=this.consultTime.substring(3,5);
      } 
      else{
        hr=(hr+12)%24;
        time+=String(hr);
        if(n==7) time+=this.consultTime.substring(2,4);
        else time+=this.consultTime.substring(3,5);
      }
    }
    let appointmentPost:AppointmentPost={
      dateofappointment:parseInt(date),
      timeofappointment:parseInt(time),
      doctorid:this.doctorId,
      patientid:form.value.patientName,
      appointmentdesc:form.value.desc,
    }
    console.log(appointmentPost);
    this.appointmentService.bookAppointment(appointmentPost).subscribe(data=>{
      this.appointmentStatus=data;
      console.log(JSON.stringify(appointmentPost)); 
      console.log(this.appointmentStatus);
      if(this.appointmentStatus.localeCompare("AppointmentFixed"))
        this.confirmation=true;
      else this.confirmation=false;
      this.router.navigate(['appointment-confirmation/'+this.doctorId],{queryParams:{
        dateofappointment:this.consultDate,
        timeofappointment:this.consultTime,
        doctorname:this.doctor.name,
        confirmation:this.confirmation
      }});
    });

  }
 
}

