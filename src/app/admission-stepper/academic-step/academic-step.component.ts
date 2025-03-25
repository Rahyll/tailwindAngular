import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PrimengImportsModule } from '../../primeng-import';
import { FormArray, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { ErrorwrapperComponent } from '../../shared/components/errorwrapper/errorwrapper.component';
@Component({
  selector: 'app-academic-step',
  imports: [
    PrimengImportsModule,
    NgFor,
    NgIf,
    ReactiveFormsModule,
    ErrorwrapperComponent,
  ],
  templateUrl: './academic-step.component.html',
  styleUrl: './academic-step.component.scss',
})
export class AcademicStepComponent {
  @Input() form!: FormGroup;
  @Input() exams: any[] = [];
  @Output() addQualification = new EventEmitter<void>();
  @Output() removeQualification = new EventEmitter<number>();

  ngOnInit() {}

  get academicQualifications() {
    return this.form.get('academicQualifications') as FormArray;
  }

  get bpharmYears() {
    return this.form.get('bpharmYears') as FormArray;
  }

  getYearSemesters(yearIndex: number): FormArray {
    return this.bpharmYears.at(yearIndex).get('semesters') as FormArray;
  }
}
