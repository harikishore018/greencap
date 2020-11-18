import { TestBed } from '@angular/core/testing';

import { AppointmentDeleteService } from './appointment-delete.service';

describe('AppointmentDeleteService', () => {
  let service: AppointmentDeleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppointmentDeleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
