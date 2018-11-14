import { Component, OnInit } from '@angular/core';
import { WikipediaService } from '../services/wikipedia.service';
import { HistoryService } from '../history/history.service';
import { GoogleTranslateService } from '../google-translate.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  searchText: string;
  wikiResults: any;
  wikiText: any;
  constructor(private wikipediaService: WikipediaService,
              private googleTranslateService: GoogleTranslateService,
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
    var divElement = document.getElementById(item);
    var text = divElement.innerHTML
    var translation;
    this.googleTranslateService.translate(text).subscribe((res: any) => {
           console.log(res);
           translation = res.data.translations[0].translatedText;
           divElement.outerHTML = `<p>${translation}</p>`;
         },
         err => {
           console.log(err);
         }
       );
      //this.hisoryService.updateHistory("User translated text.", text, translation);
  }

  addHistory(){
  }

  ngOnInit() {
  }

}
