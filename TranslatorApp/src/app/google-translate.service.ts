import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { googleApiKey } from '../environments/environment'

const url = `https://translation.googleapis.com/language/translate/v2?key=${googleApiKey}`;

@Injectable()
export class GoogleTranslateService {
  constructor(private http: HttpClient) {}

  translate(text: any) {
    var obj = new GoogleObj;
    obj.q = text
    console.log('Translating...');
    return this.http.post(url, obj);
  }
}

  export class GoogleObj {
    q: string;
    readonly source: string = 'en';
    readonly target: string = 'es';
    readonly format: string = 'text';
}
