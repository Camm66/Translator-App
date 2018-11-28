import { Component, OnInit } from '@angular/core';
import { HistoryService } from './history.service'
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
    userHistory: any;
    historySubscription: Subscription;
    sortFlag: boolean;
    constructor(private historyService: HistoryService) {
      this.sortFlag = false;
    }

    sortHistory(){
      this.sortFlag = !this.sortFlag
      var i = 0;
      for(i = 0; i < this.userHistory.length; i++){
        var j = 0;
        for( j = i; j < this.userHistory.length; j++){
          if (this.sortFlag){
            if(parseInt(this.userHistory[i].timestamp) < parseInt(this.userHistory[j].timestamp))
              this.swap(i, j);
          }
          else if(!this.sortFlag){
            if(parseInt(this.userHistory[i].timestamp) > parseInt(this.userHistory[j].timestamp))
              this.swap(i, j);
          }
        }
      }
    }

    swap(a: number, b: number){
      var swap = this.userHistory[a];
      this.userHistory[a] = this.userHistory[b];
      this.userHistory[b] = swap;
  }

    ngOnInit() {
      this.historySubscription = this.historyService.getSearchHistory()
      .subscribe((history: any) => { this.userHistory = history;});
    }

    ngOnDestroy(){
      this.historySubscription.unsubscribe();
    }
  }
