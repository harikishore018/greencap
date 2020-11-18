import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookappointmentService {

  constructor(private httpClient:HttpClient) { }

  bookAppointment(appointmentData){
    let postUrl="http://10.0.1.4:8080/appointment-fixing-service/appointments/book/";
    return this.httpClient.post<any>(postUrl,appointmentData,{responseType: 'text' as 'json'});
  }
}
