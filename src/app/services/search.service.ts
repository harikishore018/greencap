import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DocSearchResult } from '../models/docsearchresult';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private httpClient : HttpClient) { }

  getLocations():Observable<String>{
    const locationsUrl="http://localhost:3000/locations";
    return this.httpClient.get<String>(locationsUrl);
  }

  getSpecializations():Observable<String>{
    const specsUrl="http://localhost:3000/specializations";
    return this.httpClient.get<String>(specsUrl);
  }

  getDoctors():Observable<DocSearchResult>{
    const docsUrl="http://localhost:3000/doctors";
    return this.httpClient.get<DocSearchResult>(docsUrl);
  }

  getDoctorsinLocation(location):Observable<DocSearchResult>{
    // console.log(location);
    const docsUrl="http://localhost:3000/doctors?location="+location;
    return this.httpClient.get<DocSearchResult>(docsUrl);
  }

  getSpecializedDoctors(specialization):Observable<DocSearchResult>{
    const docsUrl="http://localhost:3000/doctors?specialization="+specialization;
    return this.httpClient.get<DocSearchResult>(docsUrl);
  }

  getSpecializedDoctorsInLocation(specialization,location):Observable<DocSearchResult>{
    const docsUrl="http://localhost:3000/doctors?specialization="+specialization+"&location="+location;
    return this.httpClient.get<DocSearchResult>(docsUrl);
  }

}
