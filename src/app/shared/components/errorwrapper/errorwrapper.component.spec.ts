import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorwrapperComponent } from './errorwrapper.component';

describe('ErrorwrapperComponent', () => {
  let component: ErrorwrapperComponent;
  let fixture: ComponentFixture<ErrorwrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorwrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorwrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
