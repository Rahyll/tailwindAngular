import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyStepComponent } from './family-step.component';

describe('FamilyStepComponent', () => {
  let component: FamilyStepComponent;
  let fixture: ComponentFixture<FamilyStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FamilyStepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamilyStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
