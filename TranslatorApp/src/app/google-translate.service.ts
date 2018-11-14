import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { googleApiKey } from '../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class GoogleTranslateService {
  const url = `https://translation.googleapis.com/language/translate/v2?key=${googleApiKey}`;
  constructor(private http: HttpClient) {}

  translate(text: any, key: string) {
    var obj = new GoogleObj;
    obj.q = text
    console.log('Translating...');
    return this.http.post(this.url, obj);
  }
}
  export class GoogleObj {
    q: string;
    readonly source: string = 'en';
    readonly target: string = 'es';
    readonly format: string = 'text';
  }
}
