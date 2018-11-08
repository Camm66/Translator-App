import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {
  email: string;
  password: string;
  constructor(private router: Router,
              private registerService: RegisterService) { }

  addNewUser(){
    var password = <HTMLInputElement>document.getElementById("password")
    var confirm_password = <HTMLInputElement>document.getElementById("confirm_password");
    console.log(password.value);
    console.log(confirm_password.value);
    if(password.value == confirm_password.value){
      this.registerService.addNewUser(this.email, this.password);     
    } else {
      //FIX ME
      document.getElementById("invalidMsg").innerHTML = "Passwords Don't Match!");
       confirm_password.setCustomValidity("Passwords Don't Match");
    }
  }
}
