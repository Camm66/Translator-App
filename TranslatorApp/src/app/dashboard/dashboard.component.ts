import { Component, OnInit, AfterViewInit } from '@angular/core';
import { WikipediaService } from '../wikipedia.service';
import { HistoryService } from '../history/history.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit, AfterViewInit {
  searchText: string;
  wikiResults: any;
  wikiText: any;
  constructor(private wikipediaService: WikipediaService,
              private historyService: HistoryService) {
                this.wikiText = [];
              }

  search(){
  this.wikipediaService.search(this.searchText)
    .subscribe((res: any) => this.wikipediaService.searchForPage(res)
      .subscribe((res: any) => this.parseWikiResults(res)));
    this.historyService.updateHistorySearch(this.searchText);
  }

  parseWikiResults(res){
    this.wikiResults = res['parse'];
    var unparsedText = res['parse']['text']['*'].match(/<p>[\S\s]*?<\/p>/gi);
    for(var i = 0; i < unparsedText.length; i++){
      var regex = /(<([^>]+)>)/ig,
      result = unparsedText[i].replace(regex, "");
      this.wikiText.push(result);
    }
  }

  ngOnInit() {
  }

  ngAfterViewInit(){
  }

}
