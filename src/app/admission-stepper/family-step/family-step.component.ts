import { Component, input, output } from '@angular/core';
import { PrimengImportsModule } from '../../primeng-import';
import { FormArray, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-family-step',
  imports: [PrimengImportsModule, ReactiveFormsModule],
  templateUrl: './family-step.component.html',
  styleUrl: './family-step.component.scss',
})
export class FamilyStepComponent {
  readonly parentform = input.required<FormGroup>();
  readonly referenceArray = input.required<FormArray>();
  readonly addReference = output<void>();

  getGroup(index: number) {
    return this.referenceArray().at(index) as FormGroup;
  }
}
