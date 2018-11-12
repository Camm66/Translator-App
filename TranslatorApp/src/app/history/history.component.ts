import { Component, OnInit } from '@angular/core';
import { HistoryService } from './history.service'
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  searches: any;
    historySubscription: Subscription;
    constructor(private historyService: HistoryService) {
    }

    ngOnInit() {
      this.historySubscription = this.historyService.getSearchHistory()
      .subscribe((history: any) => { this.searches = history; });
    }

    ngOnDestroy(){
      this.historySubscription.unsubscribe();
    }
  }
