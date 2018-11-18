import { Component, OnInit, Input, Renderer2, ViewChild } from '@angular/core';
import { HistoryService } from '../history/history.service';
import { GoogleTranslateService, GoogleQuery } from '../google-translate.service'

@Component({
  selector: 'app-text-section',
  templateUrl: './text-section.component.html',
  styleUrls: ['./text-section.component.css']
})
export class TextSectionComponent implements OnInit {
  @Input() text: string;
  @Input() language: string;
  @ViewChild('textContainer') textContainer;
  languageConfig: GoogleQuery;
  constructor(private googleTranslateService: GoogleTranslateService,
              private historyService: HistoryService,
              private renderer: Renderer2) {
      this.languageConfig = new GoogleQuery;
  }

  translateText(){
    var target = this.language;
    var translation;
    this.languageConfig.target = target;
    this.googleTranslateService.translate(this.text, this.languageConfig).subscribe((res: any) => {
           translation = res.data.translations[0].translatedText;
           this.renderResults(translation);
           this.renderer.removeChild(this.textContainer.nativeElement,
                                     this.textContainer.nativeElement.childNodes[0]);
          this.historyService.updateHistoryTranslation(this.text, translation);
           if(this.languageConfig.source == 'en'){
             this.languageConfig.source = target;
             this.languageConfig.target = 'en';
           } else {
             this.languageConfig.source = 'en';
             this.languageConfig.target = target;
           }
         },
         err => {
           console.log(err);
         }
       );
  }

  translateWord(span, source, target){
    var translatedWord;
    var settings = new GoogleQuery;
    console.log("translateword")
    settings.source = source;
    settings.target = target;
    this.googleTranslateService.translate(span.childNodes[0].innerHTML, settings).subscribe((res: any) => {
           translatedWord = res.data.translations[0].translatedText
           this.renderer.removeChild(span, span.childNodes[0]);
           const newText = this.renderer.createText(String(translatedWord) + " ")
           const textSpan = this.renderer.createElement('span');
           this.renderer.addClass(textSpan, 'word');
           this.renderer.listen(textSpan, "click", (event) => {
             this.translateWord(span, this.languageConfig.target, this.languageConfig.source);
           });
           this.renderer.appendChild(textSpan, newText);
           this.renderer.appendChild(span, textSpan);
         },
         err => {
           console.log(err);
         }
       );
  }

  renderResults(translation){
    const div = this.renderer.createElement('p');
    this.renderer.removeChild(this.textContainer.nativeElement,
                              this.textContainer.nativeElement.childNodes[0]);
    var translatedWords = translation.split(" ");
    for(var i = 0; i < translatedWords.length; i++){
      const span = this.renderer.createElement('span');
      const textSpan = this.renderer.createElement('span');
      this.renderer.addClass(textSpan, 'word');
      const text = this.renderer.createText(translatedWords[i] + " ");
      this.renderer.listen(textSpan, "click", (event) => {
        this.translateWord(span, this.languageConfig.source, this.languageConfig.target);
      });
      this.renderer.appendChild(textSpan, text)
      this.renderer.appendChild(span, textSpan)
      this.renderer.appendChild(div, span)
    };
    this.renderer.appendChild(this.textContainer.nativeElement, div)
  }

  ngOnInit(){
    var regex = /(<([^>]+)>)/ig,
    result = this.text.replace(regex, "");
  }
}
