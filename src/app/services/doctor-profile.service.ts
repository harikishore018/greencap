import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DocSearchResult } from '../models/docsearchresult';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorProfileService {

  constructor(private httpClient : HttpClient) { }

  getDoctorProfile(doctorId):Observable<DocSearchResult>{
    const url="http://localhost:3000/doctors/"+doctorId;
    return this.httpClient.get<DocSearchResult>(url);
  }
}
