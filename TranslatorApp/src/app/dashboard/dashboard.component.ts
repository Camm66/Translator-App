import { Component } from '@angular/core';
import { WikipediaService } from '../wikipedia.service';
import { HistoryService } from '../history/history.service';

declare let gtag: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {
  searchText: string;
  language: string;
  wikiResults: any;
  wikiText: any;
  constructor(private wikipediaService: WikipediaService,
              private historyService: HistoryService) {
                this.wikiText = [];
                this.language = 'es';
              }

  search(){
    // Query the wikipedia api with the search values
    this.wikipediaService.search(this.searchText)
        .subscribe((res: any) => this.wikipediaService.searchForPage(res)
        .subscribe((res: any) => this.parseWikiResults(res)));
    // Register as a search event with google analytics
    gtag('event', 'search', {
         'event_category' : 'wikipedia-search'
         });
    // Log the search event in the firebase db
    this.historyService.updateHistorySearch(this.searchText);
  }

  parseWikiResults(res){
    this.wikiResults = res['parse'];
    var unparsedText = res['parse']['text']['*'].match(/<p>[\S\s]*?<\/p>/gi);

    for(var i = 0; i < unparsedText.length; i++){
      var regex = /(<([^>]+)>)/ig,
      firstRun = unparsedText[i].replace(regex, "");

      var regex2 = /(&#([0-9]+);([0-9]+)&#([0-9]+);)/ig,
      result = firstRun.replace(regex2, "");

      if(result.length > 1){
        this.wikiText.push(result);
      }
    }
  }

  reload(){
    window.location.reload();
  }
}
