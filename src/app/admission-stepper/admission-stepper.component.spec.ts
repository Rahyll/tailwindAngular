import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionStepperComponent } from './admission-stepper.component';

describe('AdmissionStepperComponent', () => {
  let component: AdmissionStepperComponent;
  let fixture: ComponentFixture<AdmissionStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmissionStepperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmissionStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
