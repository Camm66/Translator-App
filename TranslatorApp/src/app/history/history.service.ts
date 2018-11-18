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
    var d = new Date();
    var dformat = [d.getMonth()+1,
               d.getDate(),
               d.getFullYear()].join('/')+' '+
              [d.getHours(),
               d.getMinutes(),
               d.getSeconds()].join(':');

    this.searchHistoryRef.push({ userUid: this.loginService.userUid,
                                 timestamp: dformat,
                                 action: 'translate',
                                 text: text,
                                 translation: translation});
  }

  updateHistorySearch(text) {
    var d = new Date();
    var dformat = [d.getMonth()+1,
               d.getDate(),
               d.getFullYear()].join('/')+' '+
              [d.getHours(),
               d.getMinutes(),
               d.getSeconds()].join(':');

    this.searchHistoryRef.push({ userUid: this.loginService.userUid,
                                 timestamp: dformat,
                                 action: 'search',
                                 text: text});
  }

  getSearchHistory(){
    return this.searchHistoryRef.valueChanges();
  }
}
