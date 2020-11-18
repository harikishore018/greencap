import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentDeleteService } from '../services/appointment-delete.service';
import { DoctorappointmentsService } from '../services/doctorappointments.service';
// import { RequestOptions,  Headers } from '@angular/http';

@Component({
  selector: 'app-doctordashboard',
  templateUrl: './doctordashboard.component.html',
  styleUrls: ['./doctordashboard.component.css']
})
export class DoctordashboardComponent implements OnInit {

  doctorId;
  appointmentsDue;
  appointmentsPast;
  pastAppointmentsCount;
  futureAppointmentsCount;
  newDate;
  formattedDate;

  constructor(private activatedRoute:ActivatedRoute,
              private router:Router,
              private doctorAppointmentService:DoctorappointmentsService,
              private appointmentDelete:AppointmentDeleteService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params=>{
      this.doctorId=params.get('doctorId');
    });
    this.doctorAppointmentService.getAppointmentsDue(this.doctorId).subscribe(data=>{
      this.appointmentsDue=data;
    });
    this.doctorAppointmentService.getAppointmentsPast(this.doctorId).subscribe(data=>{
      this.appointmentsPast=data;
    });

  }

  dateConverter(date){
    this.newDate =date.toString();
    if(this.newDate.length==7)
      this.newDate="0"+this.newDate;
    this.formattedDate= this.newDate.slice(0, 2) + "-" + this.newDate.slice(2, 4) + "-" + this.newDate.slice(4, 8);
    return this.formattedDate;
  }
  timeConverter(time){
    this.newDate=time.toString();
    if(this.newDate.length==3)
      this.newDate="0"+this.newDate;
      return this.newDate.slice(0,2)+":"+this.newDate.slice(2,4);
  }

  deleteAppointment(appointment){
    let reqData=JSON.stringify(
      {
        dateofappointment:parseInt(appointment.dateofappointment),
        timeofappointment:parseInt(appointment.timeofappointment),
        doctorid:appointment.doctorid,
        patientid:appointment.patientid,
      });


    console.log(reqData);
      this.appointmentDelete.deleteAppointment(reqData).subscribe(data=>{
        window.location.reload();
      });
  }

}
