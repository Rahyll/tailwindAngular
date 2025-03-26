import { Component, input, output } from '@angular/core';
import { PrimengImportsModule } from '../../primeng-import';
import { FormArray, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { ErrorwrapperComponent } from '../../shared/components/errorwrapper/errorwrapper.component';
@Component({
  selector: 'app-academic-step',
  imports: [
    PrimengImportsModule,
    ReactiveFormsModule,
    ErrorwrapperComponent
],
  templateUrl: './academic-step.component.html',
  styleUrl: './academic-step.component.scss',
})
export class AcademicStepComponent {
  readonly form = input.required<FormGroup>();
  readonly exams = input<any[]>([]);

  readonly addQualification = output<void>();
  readonly removeQualification = output<number>();
  academicsData: any[] = [
    {
      examination: 'SSC',
      board: 'Maharashtra State Board',
      passingDate: 'Mar 2015', // Month and Year
      marks: 75, // Percentage marks
    },
    {
      examination: 'HSC',
      board: 'UP Board',
      passingDate: 'May 2017',
      marks: 82,
    },
    {
      examination: 'Diploma',
      board: 'Maharashtra State Board',
      passingDate: 'Jun 2019',
      marks: 88,
    },
  ];
  value: number = 0;

  ngOnInit() {}

  get academicQualifications() {
    return this.form().get('academicQualifications') as FormArray;
  }

  get bpharmYears() {
    return this.form().get('bpharmYears') as FormArray;
  }

  getYearSemesters(yearIndex: number): FormArray {
    return this.bpharmYears.at(yearIndex).get('semesters') as FormArray;
  }
}
