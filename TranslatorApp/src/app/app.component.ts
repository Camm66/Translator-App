import { Component } from '@angular/core';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TranslatorApp';
  loggedIn: boolean;
  constructor(private loginService: LoginService){
    this.loggedIn = false;
  }

  logout() {
    this.loginService.signOut();
  }
}
