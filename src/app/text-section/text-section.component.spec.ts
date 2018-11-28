import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoryService } from '../history/history.service';
import { GoogleTranslateService, GoogleQuery } from '../google-translate.service';
import { Renderer2 } from '@angular/core';
import { TextSectionComponent } from './text-section.component';

describe('TextSectionComponent', () => {
  let component: TextSectionComponent;
  let fixture: ComponentFixture<TextSectionComponent>;

  let historyServiceStub: Partial<HistoryService>;
      historyServiceStub = {
      };
  let googleServiceStub: Partial<GoogleTranslateService>;
      googleServiceStub = {
      };
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TextSectionComponent ],
      providers: [{provide: GoogleTranslateService, useValue: googleServiceStub},
        {provide: HistoryService, useValue: historyServiceStub},
        Renderer2]
    })

    fixture = TestBed.createComponent(TextSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
