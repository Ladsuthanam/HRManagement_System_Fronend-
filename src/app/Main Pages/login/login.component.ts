import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isRegisterActive = false;  

  // Function to toggle the active class for switching between login and register forms
  toggleForm(isRegister: boolean): void {
    this.isRegisterActive = isRegister;
  }
  
}
