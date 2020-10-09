import { TestBed } from '@angular/core/testing';
import { DynamicFormService } from './dynamic-form.service';

describe('DynamicFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DynamicFormService = TestBed.inject(DynamicFormService);
    expect(service).toBeTruthy();
  });
});
