import { Component, OnInit } from '@angular/core';
import { WikipediaService } from '../services/wikipedia.service';
import { HistoryService } from '../history/history.service':

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
  constructor(private wikipediaService: WikipediaService
              private historyService: HistoryService) { }

  search(){
  this.wikipediaService.search(this.searchText)
    .subscribe((res: any) => this.searchForPage(res));
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
    var translation;
    translate( text, {from: 'en', to: 'nl'}).then(res => {
      console.log(res.text);
      var translation = res.txt;
      document.getElementById(item).innerHTML = res.text;
    });
      //this.hisoryService.updateHistory("User translated text.", text, translation);
  }

  addHistory(){

  }

  ngOnInit() {
  }

}
