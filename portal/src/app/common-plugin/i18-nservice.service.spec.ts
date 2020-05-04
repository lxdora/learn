import { TestBed } from '@angular/core/testing';

import { I18NServiceService } from './i18-nservice.service';

describe('I18NServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: I18NServiceService = TestBed.get(I18NServiceService);
    expect(service).toBeTruthy();
  });
});
