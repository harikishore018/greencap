import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient:HttpClient) { }

  isAuthenticated=null;

  register(userDetails){
    let url="http://localhost:8080/patient-service/register";
    return this.httpClient.post<any>(url,userDetails);
  }

  login(userDetails){
    let url="http://localhost:8080/login-service/login";
    return this.httpClient.post<any>(url,userDetails);
  }

  addProfile(userDetails){
    let url="http://localhost:8080/patient-service/addinfo";
    return this.httpClient.post<any>(url,userDetails,{responseType:'text' as 'json'});
  }


} 
