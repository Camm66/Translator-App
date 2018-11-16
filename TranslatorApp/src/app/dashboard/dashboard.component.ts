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
    .subscribe((res: any) => this.wikipediaService.searchForPage(res)
      .subscribe((res: any) => this.renderWikiResults(res)));
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
           this.renderTranslatedText(item, translation);
         },
         err => {
           console.log(err);
         }
       );
      //this.hisoryService.updateHistory("User translated text.", text, translation);
  }

  renderTranslatedText(item, translation){
    var text;
    var translatedText = translation.split(" ");
    for(var i = 0; i < translatedText.length; i++){
      var id = i + 10000
      var word = `<span id="${id}" (click)="onClick(translateWord(${id}))"> ${translatedText[i]}</span>`
      text += word;
    }
      var divElement = document.getElementById(item);
      divElement.outerHTML = `<p>${text}</p>`;
  }

  translateWord(id){
    console.log("Translate Word was Pressed");
    var divElement = document.getElementById(id);
    var text = divElement.innerHTML;
    var translatedWord;
    this.googleTranslateService.translate(text).subscribe((res: any) => {
           console.log(res);
           translatedWord = res.data.translations[0].translatedText;
           divElement.outerHTML =  `<span id="${id}" (click)="onClick(translateWordBack(${id}))"> ${translatedWord}</span>`
         },
         err => {
           console.log(err);
         }
       );
  }

  ngOnInit() {
  }

}
