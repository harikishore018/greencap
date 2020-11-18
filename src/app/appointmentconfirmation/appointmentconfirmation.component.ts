import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-appointmentconfirmation',
  templateUrl: './appointmentconfirmation.component.html',
  styleUrls: ['./appointmentconfirmation.component.css']
})
export class AppointmentconfirmationComponent implements OnInit {

  consultationDate:string;
  consultationTime:string;
  doctorName:string;
  confirmation=false;

  constructor(private activatedRoute:ActivatedRoute) { 
    this.activatedRoute.paramMap.subscribe(params=>{
      this.activatedRoute.queryParams.subscribe(queryParams=>{
        this.consultationDate=queryParams['dateofappointment'];
        this.consultationTime=queryParams['timeofappointment'];
        this.doctorName=queryParams['doctorname'];
        this.confirmation=queryParams['confirmation'];
      })
      console.log(this.confirmation);
    })

  }

  ngOnInit(): void {

  }

  

}
