import { Component, OnInit } from '@angular/core';
import { WikipediaService } from '../services/wikipedia.service';

declare var require: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  searchText: string;
  wikiResults: any;
  wikiText: any;
  constructor(private wikipediaService: WikipediaService) { }

  search(){
  this.wikipediaService.search(this.searchText)
    .subscribe((res: any) => this.searchForPage(res));
  //this.hisoryService.updateHistory(this.searchText);
  }

  searchForPage(res){
    console.log(res);
    this.wikipediaService.searchForPage(res)
      .subscribe((res: any) => this.renderWikiResults(res));
  }

  renderWikiResults(res){
    console.log(res);
    this.wikiResults = res['parse'];
    this.wikiText = res['parse']['text']['*'].match(/<p>[\S\s]*?<\/p>/gi);
  }

  renderWikiHTML(item, i){
    var regex = /(<([^>]+)>)/ig,
    result = item.replace(regex, "");
    if(result != null){
      document.getElementById(i).innerHTML = result;
    }
  }

  translateText(item){
    const translate = require('google-translate-api');

    var text = document.getElementById(item).innerHTML;
    translate( text, {from: 'en', to: 'nl'}).then(res => {
      console.log(res.text);
      document.getElementById(item).innerHTML = res.text;
    });
  }

  ngOnInit() {
  }

}
