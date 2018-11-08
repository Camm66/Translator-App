import { Component, OnInit } from '@angular/core';
import { WikipediaService } from '../services/wikipedia.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  searchText: string;
  wikiResults: any;
  constructor(private wikipediaService: WikipediaService) { }

  search(){
  this.wikipediaService.search(this.searchText)
    .subscribe((res: any) => this.searchPage(res));
  //this.historyService.updateHistory(this.searchText);
  }

  searchPage(res){
    console.log(res);
    this.wikipediaService.searchPage(res)
      .subscribe((res: any) => this.renderWikiResults(res));
  }

  renderWikiResults(res){
    console.log(res);
    //this.wikiResults = res['query']['search'];
  }

  renderWikiHTML(html, id){
  document.getElementById(id).innerHTML = html;
  }

  ngOnInit() {
  }

}
