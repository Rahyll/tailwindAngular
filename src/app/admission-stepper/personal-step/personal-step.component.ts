import { Component, input } from '@angular/core';
import { PrimengImportsModule } from '../../primeng-import';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { ErrorwrapperComponent } from '../../shared/components/errorwrapper/errorwrapper.component';
@Component({
  selector: 'app-personal-step',
  imports: [
    PrimengImportsModule,
    ReactiveFormsModule,
    ErrorwrapperComponent
],
  templateUrl: './personal-step.component.html',
  styleUrl: './personal-step.component.scss',
})
export class PersonalStepComponent {
  readonly form = input.required<FormGroup>();
  readonly categories = input<any[]>([]);
  readonly bloodGroups = input<any[]>([]);

  get lastNameControl(): FormControl {
    return this.form().get('lastName') as FormControl;
  }

  get firstNameControl(): FormControl {
    return this.form().get('firstName') as FormControl;
  }

  get parentNameControl(): FormControl {
    return this.form().get('parentName') as FormControl;
  }

  get dobControl(): FormControl {
    return this.form().get('dob') as FormControl;
  }

  get bloodGroupControl(): FormControl {
    return this.form().get('bloodGroup') as FormControl;
  }

  get genderControl(): FormControl {
    return this.form().get('gender') as FormControl;
  }

  get panNumberControl(): FormControl {
    return this.form().get('panNumber') as FormControl;
  }

  get aadharNumberControl(): FormControl {
    return this.form().get('aadharNumber') as FormControl;
  }

  get residentialAddressControl(): FormControl {
    return this.form().get('residentialAddress') as FormControl;
  }

  get permanentAddressControl(): FormControl {
    return this.form().get('permanentAddress') as FormControl;
  }

  ngOnInit() {}
}
