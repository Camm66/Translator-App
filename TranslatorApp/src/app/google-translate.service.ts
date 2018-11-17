import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { googleApiKey } from '../environments/environment'

@Injectable()
export class GoogleTranslateService {
  url: string;
  constructor(private http: HttpClient) {
    this.url = `https://translation.googleapis.com/language/translate/v2?key=${googleApiKey}`;
  }

  translate(text: string, settings: GoogleQuery) {
    settings.q = text;
    return this.http.post(this.url, settings);
  }

}

  export class GoogleQuery {
    q: string;
    source: string = 'en';
    target: string = 'es';
    readonly format: string = 'text';
}
