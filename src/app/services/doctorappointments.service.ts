import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DoctorAppointment } from '../models/doctorappointment';

@Injectable({
  providedIn: 'root'
})
export class DoctorappointmentsService {

  constructor(private httpClient:HttpClient) { }

  getAppointmentsPast(doctorId):Observable<DoctorAppointment>{
      let url="http://localhost:8080/time-availability-ms/previous?id="+doctorId;
      return this.httpClient.get<DoctorAppointment>(url);
  }
  getAppointmentsDue(doctorId):Observable<DoctorAppointment>{
    let url="http://localhost:8080/time-availability-ms/future?id="+doctorId;
    return this.httpClient.get<DoctorAppointment>(url);
}
}
