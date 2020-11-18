import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { strict } from 'assert';
import { DocSearchResult } from '../models/docsearchresult';
import { doctorProfile } from '../models/doctorprofile';
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
  today:string[]=[];
  tomorrow:string[]=[];
  dates:Date[]=[];
  temp=[0,1,2,3,4,5];
  clinicToday:number[]=[];
  timeSelected:string;
  // doctor:DocSearchResult={
  //   id : 0,
  //   name : " ",
  //   specialization : ["0"],
  //   experience :0,
  //   qualification : ["0"],
  //   location : " ",
  //   clinic : " ",
  //   description : " ",
  //   rating : 0,
  //   consultationfee : 0,
  //   isverified : false,
  //   videoavailability:[[]],
  //   clinicavailability:[[]]
  // };
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
      [1100,1200,1400,1530],
      [1300,1200,100],
      [1300,1200,100],
      [1300,1200,100],
      [1300,1200,100],
      [1300,1200,100],
      [1300,1200,100]
  ]
  };


  constructor(private activatedRoute : ActivatedRoute,
              private doctorprofileService : DoctorProfileService,
              private router : Router) {  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params=>{
      this.doctorId=params.get('doctorId');
      this.doctorprofileService.getDoctorProfile(this.doctorId).subscribe(data =>{
        this.doctor=data;
        // for(const ele of this.doctor.qualification){
        //     this.qualification+=ele+",";
        // }
        // this.qualification=this.qualification.substr(0,this.qualification.length-1);
        // for(const ele of this.doctor.specialization){
        //   this.specialization+=ele+",";
        // }
        // this.specialization=this.specialization.substr(0,this.specialization.length-1);
        this.qualification=this.doctor.qualification;
        this.specialization=this.doctor.specialisation;
        if(isNaN(this.doctor.totalRating))
          this.doctor.totalRating=1;
        this.fullstar=Array(Math.floor(this.doctor.totalRating)).fill(1);
        this.halfstar=this.doctor.totalRating-Math.floor(this.doctor.totalRating) >= 0.5;
        this.emptystar=Array(5-this.fullstar.length-(this.halfstar==true? 1 : 0)).fill(1);
        
        // console.log(this.doctor.availableslots[0]);
        this.doctor.availableslots=data.availableslots;
        this.doctor.clinicslots=[
          [1100,1245,1300,1500],
          [1300,1200,100],
          [1300,1200,100],
          [1300,1200,100],
          [1300,1200,100],
          [1300,1200,100],
          [1300,1200,100]
      ];
        for(let i=0;i<2;i++){
          for(let j=0;j<this.doctor.availableslots[i].length;j++){
            let curr=this.doctor.availableslots[i][j];
            if(curr==1200){
              if(i==0) this.today.push("12:00 PM");
              if(i==1) this.tomorrow.push("12:00 PM");
              continue;
            }
            if(curr==2400){
              if(i==0) this.today.push("12:00 AM");
              if(i==1) this.tomorrow.push("12:00 AM");
              continue;
            }
            let str="";
            let flag=false;
            let a=Math.floor(curr/100);
            let b=curr%100;
            if(a>12){
              a=a-12;
              flag=true;
            }
            str=a.toString()+":";
            if(b==0) str+="00";
            else str+=b.toString();
            if(flag)
              str+=" "+"PM";
            else str+=" "+"AM";
            if(i==0){
              this.today.push(str);
            }
            else this.tomorrow.push(str);
          }
        }
        console.log(this.today);
        console.log(this.tomorrow);

        // this.today=this.doctor.videoavailability[0];
        // this.tomorrow=this.doctor.videoavailability[1];

        this.clinicToday=this.doctor.clinicslots[0];

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
