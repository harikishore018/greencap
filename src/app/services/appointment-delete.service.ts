import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppointmentDeleteService {

  constructor(private httpCLient:HttpClient) { }

  deleteAppointment(appointment){
    let url="http://localhost:8080/appointment-fixing-service/appointments/delete";
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = ({
      headers: headers,
      body : appointment,
      responseType: 'text' as 'json'
    });
    return this.httpCLient.request<any>('delete',url,options);
  }
}
