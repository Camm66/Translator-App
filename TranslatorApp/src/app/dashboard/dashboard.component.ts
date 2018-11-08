import { Component, OnInit } from '@angular/core';
import { WikipediaService } from '../services/wikipedia.service';
import { $ } from 'jquery';

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
  }

  renderWikiHTML(){
    var wikiText = this.wikiResults['text']['*'];
    document.getElementById("wikiText").innerHTML = wikiText;

    console.log(wikiText);
    var regex = /(<([^>]+)>)/ig,
    body = wikiText,
    result = body.replace(regex, "");
    }

  translateWikiHtml(){

  }

  ngOnInit() {
  }

}
