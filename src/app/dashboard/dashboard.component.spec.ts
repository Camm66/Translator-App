import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Router} from '@angular/router';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { WikipediaService } from '../wikipedia.service';
import { HistoryService } from '../history/history.service';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    let historyServiceStub: Partial<HistoryService>;
        historyServiceStub = {
        };
    let wikiServiceStub: Partial<WikipediaService>;
        wikiServiceStub = {
        };

    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports : [FormsModule, NgModule],
      providers: [{provide: HistoryService, useValue: historyServiceStub},
      {provide: WikipediaService, useValue: wikiServiceStub}]
    })
    .compileComponents();
  }));
});
