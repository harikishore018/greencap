import { TestBed } from '@angular/core/testing';

import { DoctorappointmentsService } from './doctorappointments.service';

describe('DoctorappointmentsService', () => {
  let service: DoctorappointmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorappointmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
