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
    // const locationsUrl="http://localhost:3000/locations";
    const locationsUrl="http://10.0.1.4:8080/doctors-search-filters/search/doctors/allLocations";
    return this.httpClient.get<String>(locationsUrl);
  }

  getSpecializations():Observable<String>{
    // const specsUrl="http://localhost:3000/specializations";
    const specsUrl="http://10.0.1.4:8080/doctors-search-filters/search/doctors/allDepartments";
    return this.httpClient.get<String>(specsUrl);
  }

  getDoctors():Observable<DocSearchResult>{
    const docsUrl="http://localhost:8080/doctors-search-filters/search/doctors/all";
    return this.httpClient.get<DocSearchResult>(docsUrl);
  }

  getDoctorsinLocation(location):Observable<DocSearchResult>{
    // console.log(location);
    const docsUrl="http://localhost:8080/doctors-search-filters/search/doctors?location="+location;
    return this.httpClient.get<DocSearchResult>(docsUrl);
  }

  getSpecializedDoctors(specialization):Observable<DocSearchResult>{
    const docsUrl="http://localhost:8080/doctors-search-filters/search/doctors?department="+specialization;
    return this.httpClient.get<DocSearchResult>(docsUrl);
  }

  getSpecializedDoctorsInLocation(specialization,location):Observable<DocSearchResult>{
    const docsUrl="http://localhost:8080/doctors-search-filters/search/doctors?department="+specialization+"&location="+location;
    return this.httpClient.get<DocSearchResult>(docsUrl);
  }

}
