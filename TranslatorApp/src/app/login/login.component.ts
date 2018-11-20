import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  @ViewChild('invalidMsg') invalidMsg;
  constructor(
    private loginService: LoginService,
    private router: Router,
    private renderer: Renderer2){}

  ngOnInit() {
  }

  onLoginEmail(): void {
    if (this.validateForm(this.email, this.password)) {
      this.emailLogin(this.email, this.password);
    }
  }

  validateForm(email: string, password: string): boolean {
    if (email.length === 0) {
      return false;
    }

    if (password.length === 0) {
      return false;
    }

    if (password.length < 6) {
      return false;
    }
    return true;
  }

  emailLogin(email: string, password: string) {
    this.loginService.loginWithEmail(this.email, this.password)
        .then(() => this.router.navigate(['/dashboard']))
        .catch( error => {
          console.log(error['code']);
          var nodes = this.invalidMsg.nativeElement.childNodes;
          while(nodes.length > 0){
            this.renderer.removeChild(this.invalidMsg.nativeElement,
                                     this.invalidMsg.nativeElement.childNodes[0]);
          }
          const text = this.renderer.createText(error['code'].replace(/auth\//ig, "Error: "));
          this.renderer.appendChild(this.invalidMsg.nativeElement, text);
        });
  }
}
