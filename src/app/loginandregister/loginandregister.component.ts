import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-loginandregister',
  templateUrl: './loginandregister.component.html',
  styleUrls: ['./loginandregister.component.css']
})
export class LoginandregisterComponent implements OnInit {

  isLoginMode =true;
  isLoading = false;
  error: string = null;
  isPatient:boolean=true;
  registerResponse;
  loginResponse;

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onDoctorSwitch(){
    this.isPatient=!this.isPatient;
  }

  constructor(private loginService:LoginService,
              private router:Router) { }

  ngOnInit(): void {
  }

  userRegister(form){
    if(this.isLoginMode){
      this.userLogin(form)
    }
    else{
      let userDetails={
        username:form.value.username,
        password:form.value.password
      }
      console.log(userDetails);
      this.loginService.register(userDetails).subscribe(data=>{
          this.registerResponse=data;
          let temp:String=this.registerResponse.type;
          if(temp.localeCompare("User Already Exists")==0){
            this.error=this.registerResponse.type;
            form.reset();
          }
          else{
            this.router.navigate(['/profile/'+userDetails.username]);
          }
      });
    }
  }

  userLogin(form){
    let userDetails={
      username:form.value.username,
      password:form.value.password
    }
    this.loginService.login(userDetails).subscribe(data=>{
        this.loginResponse=data;
        let temp:String=this.loginResponse.type;
        if(temp.localeCompare("No such user present")==0){
          this.error="Invalid credentials!";
          form.reset();
        }
        else{
          // this.loginService.isAuthenticated=this.loginResponse;
          localStorage.setItem('userData',JSON.stringify(this.loginResponse));
          this.router.navigate(['home']);
        }
    })
  }

}
