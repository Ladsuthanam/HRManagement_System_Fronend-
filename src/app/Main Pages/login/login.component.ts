import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { error } from 'console';
import { Router } from 'express';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isRegisterActive = false;  
  loginData ={username:'',password:''};
  registerData ={username: '',email:'',password:''};

  constructor(private http:HttpClient, private router:Router){}


  // Function to toggle the active class for switching between login and register forms
  toggleForm(isRegister: boolean): void {
    this.isRegisterActive = isRegister;
  }



  onLogin(){
    this.http
        .post('',this.loginData)
        .subscribe(
          (responce:any) =>{
            alert('Login Successfull !');
            localStorage.setItem('token',responce.token);
            this.router.navigate(['/dashboard'])           
          },
          (error)=>{
            alert('Incorrect Password or UserName please, Enter correctly!')
          }
        );

  }
  onRegister() {
    this.http
      .post('', this.registerData)
      .subscribe(
        () => {
          alert('Registration successful!');
          this.toggleForm(false);
        },
        (error) => {
          alert('Error during registration: ' + error.message);
        }
      );
  }
  
}
