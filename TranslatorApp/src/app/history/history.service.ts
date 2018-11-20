import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()
export class HistoryService {
  searchHistoryRef: any;
  constructor(private loginService: LoginService,
              private db: AngularFireDatabase) {
    this.searchHistoryRef = this.db.list(`/userHistory`);
  }

  updateHistoryTranslation(text, translation) {
    var date = new Date();
    var dformat = this.formatDate(date);
    this.searchHistoryRef.push({ userUid: this.loginService.userUid,
                                 date: dformat,
                                 timestamp: date.getTime(),
                                 action: 'translate',
                                 text: text,
                                 translation: translation});
  }

  updateHistorySearch(text) {
    var date = new Date();
    var dformat = this.formatDate(date);
    this.searchHistoryRef.push({ userUid: this.loginService.userUid,
                                 date: dformat,
                                 timestamp: date.getTime(),
                                 action: 'search',
                                 text: text});
  }

  formatDate(d){
    var formatdDate = [d.getMonth()+1,
               d.getDate(),
               d.getFullYear()].join('/')+' '+
              [d.getHours(),
               d.getMinutes(),
               d.getSeconds()].join(':');
    return formatdDate;
  }

  getSearchHistory(){
    return this.searchHistoryRef.valueChanges();
  }
}
