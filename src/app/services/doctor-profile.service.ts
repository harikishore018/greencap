import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { doctorProfile } from '../models/doctorprofile';

@Injectable({
  providedIn: 'root'
})
export class DoctorProfileService {

  constructor(private httpClient : HttpClient) { }

  getDoctorProfile(doctorId):Observable<doctorProfile>{
    const url="http://10.0.1.4:8080/profile-info/doctors?id="+doctorId;
    return this.httpClient.get<doctorProfile>(url);
  }
}
