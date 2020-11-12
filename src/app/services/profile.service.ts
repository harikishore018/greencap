import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from '../models/profile.model';
import { Observable } from 'rxjs'; 
import { AuthService } from '../authentication/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpClient : HttpClient,
              private authSerivce : AuthService
              ) { }

  addProfile( profile ) : Observable<Profile>{

    const dbUrl='https://greecap-86e39.firebaseio.com/profiles.json';

    return this.httpClient.post<Profile>(dbUrl,profile);
    
  }
}
