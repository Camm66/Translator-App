import { Component, OnChanges, Input, Renderer2, ViewChild } from '@angular/core';
import { HistoryService } from '../history/history.service';
import { GoogleTranslateService, GoogleQuery } from '../google-translate.service';

declare let gtag: any;

@Component({
  selector: 'app-text-section',
  templateUrl: './text-section.component.html',
  styleUrls: ['./text-section.component.css']
})
export class TextSectionComponent implements OnChanges {
  @Input() text: string;
  @Input() language: string;
  @ViewChild('textBox') textBox;
  languageConfig: GoogleQuery;
  isTranslated: boolean;
  constructor(private googleTranslateService: GoogleTranslateService,
              private historyService: HistoryService,
              private renderer: Renderer2) {
      this.languageConfig = new GoogleQuery;
      this.isTranslated = false;
  }

  translateText(){
    var translation
    if(this.languageConfig.source != this.languageConfig.target){
    this.googleTranslateService.translate(this.text, this.languageConfig).subscribe((res: any) => {
           translation = res.data.translations[0].translatedText;
           this.renderResults(translation);
           this.historyService.updateHistoryTranslation(this.text, translation);

          var target = this.languageConfig.target;
          var source = this.languageConfig.source;
          this.languageConfig.target = source;
          this.languageConfig.source = target;

          this.isTranslated = !this.isTranslated;

           gtag('event', 'translate');
         },
         err => {
           console.log(err);
         }
       );
     }
  }

  translateWord(span, source, target){
    var translatedWord;
    var settings = new GoogleQuery;
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
    var nodes = this.textBox.nativeElement.childNodes;
    while(nodes.length > 0){
      this.renderer.removeChild(this.textBox.nativeElement,
                               this.textBox.nativeElement.childNodes[0]);
    }
    const div = this.renderer.createElement('p');
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
    this.renderer.appendChild(this.textBox.nativeElement, div)
  }

  ngOnChanges() {
    this.languageConfig.target = this.language;
 }
}
