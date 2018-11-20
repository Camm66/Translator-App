import { Component, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {
  email: string;
  password: string;
  @ViewChild('invalidMsg') invalidMsg;
  constructor(private router: Router,
              private registerService: RegisterService,
              private renderer: Renderer2) { }

  addNewUser(){
    var password = <HTMLInputElement>document.getElementById("password");
    var confirm_password = <HTMLInputElement>document.getElementById("confirm_password");
    if(password.value === confirm_password.value){
      this.registerService.addNewUser(this.email, this.password);
    } else {
      confirm_password.setCustomValidity("Passwords Don't Match");
      const text = this.renderer.createText("Passwords Don't Match!");
      this.renderer.appendChild(this.invalidMsg.nativeElement, text);
    }
  }
}
