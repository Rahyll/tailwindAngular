import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalStepComponent } from './personal-step.component';

describe('PersonalStepComponent', () => {
  let component: PersonalStepComponent;
  let fixture: ComponentFixture<PersonalStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalStepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
