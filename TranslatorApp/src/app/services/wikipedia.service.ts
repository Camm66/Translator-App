import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import 'rxjs/Rx';

@Injectable()
export class WikipediaService {
  static URL = "https://en.wikipedia.org/w/api.php"

  constructor(private http: Http){}

  search(searchText): Observable<any[]> {
    var parsedText = searchText.replace(/\b\s+\b/g, '%20')
                               .replace(/\b\s+/g, '')
                               .replace(/\s+\b/g, '');
    var queryURL = `https://en.wikipedia.org/w/api.php?action=query&list=search&origin=*&srsearch=${parsedText}&srwhat=text&utf8=&format=json`;
    return this.http.request(queryURL).map((res: any) => res.json());
  }

  searchPage(res){
    var pageID = res['query']['search']['0']['pageid'];
    var pageQuery = `https://en.wikipedia.org/api.php?action=parse&list=search&origin=*pageid=${pageID}&utf8=&format=json`;
    return this.http.request(pageQuery).map((res:any) => res.json());
  }
}
