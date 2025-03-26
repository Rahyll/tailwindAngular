import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() parentform!: FormGroup;
  @Input() referenceForm!: FormArray;
  @Output() addReference = new EventEmitter<void>();

  getGroup(index: number) {
    return this.referenceForm.at(index) as FormGroup;
  }
}
