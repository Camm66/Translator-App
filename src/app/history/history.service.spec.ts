import { TestBed } from '@angular/core/testing';

import { HistoryService } from './history.service';

describe('HistoryService', () => {
  let historyServiceStub: Partial<HistoryService>;
      historyServiceStub = {
      };
  beforeEach(() => TestBed.configureTestingModule({
    providers: [{provide: HistoryService, useValue: historyServiceStub}]
  }));

  it('should be created', () => {
    const service: HistoryService = TestBed.get(HistoryService);
    expect(service).toBeTruthy();
  });
});
