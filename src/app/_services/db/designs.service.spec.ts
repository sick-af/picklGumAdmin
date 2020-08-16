import { TestBed } from '@angular/core/testing';

import { DesignsService } from './designs.service';

describe('DesignsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DesignsService = TestBed.get(DesignsService);
    expect(service).toBeTruthy();
  });
});
