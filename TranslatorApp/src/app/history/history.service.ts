import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()
export class HistoryService {
  searchHistoryRef: any;
  constructor(private loginService: LoginService,
              private db: AngularFireDatabase) {
    this.searchHistoryRef = this.db.list(`/searchHistory`);
  }

  updateHistory(action, text, translation) {
    var d = new Date();
    var dformat = [d.getMonth()+1,
               d.getDate(),
               d.getFullYear()].join('/')+' '+
              [d.getHours(),
               d.getMinutes(),
               d.getSeconds()].join(':');

    this.searchHistoryRef.push({ Userid: this.loginService.userUid,
                                 timestamp: dformat,
                                 action: action,
                                 text: text,
                                 translation: translation});
  }

  getSearchHistory(){
    return this.searchHistoryRef.valueChanges();
  }
}
