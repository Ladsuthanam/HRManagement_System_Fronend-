import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-login',
  standalone:true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, HttpClientModule, CommonModule],

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



  onLogin() {
    this.http.post('http://localhost:5276/api/Register/login', this.loginData).subscribe(
      (response: any) => {
        alert('Login Successful!');
        localStorage.setItem('token', response.token);
        this.router.navigateByUrl('/dashboard');
      },
      (error) => {
        alert('Incorrect Username or Password. Please try again!');
      }
    );
  }
  onRegister() {
    // Client-side validation
    if (!this.registerData.username || !this.registerData.email || !this.registerData.password) {
      alert('All fields are required!');
      return;
    }
  
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.registerData.email)) {
      alert('Invalid email format!');
      return;
    }
  
    if (this.registerData.password.length < 6) {
      alert('Password must be at least 6 characters long!');
      return;
    }
  
    // Sending data to the backend
    this.http.post('http://localhost:5276/api/Register/Register', this.registerData).subscribe(
      (response) => {
        alert('Registration successful!');
        this.toggleForm(false);
      },
      (error) => {
        // Handling backend errors and showing appropriate messages
        if (error.error) {
          alert('Error during registration: ' + error.error);
        } else {
          alert('Error during registration: ' + error.message);
        }
      }
    );
  }
}
