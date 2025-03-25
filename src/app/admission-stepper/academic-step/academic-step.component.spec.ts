import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicStepComponent } from './academic-step.component';

describe('AcademicStepComponent', () => {
  let component: AcademicStepComponent;
  let fixture: ComponentFixture<AcademicStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcademicStepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademicStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
