import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { WikipediaService } from './wikipedia.service';

describe('WikipediaService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers:    [WikipediaService, HttpClient, HttpHandler]
  }));

  it('should be created', () => {
    const service: WikipediaService = TestBed.get(WikipediaService);
    expect(service).toBeTruthy();
  });
});
