import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PrimengImportsModule } from '../primeng-import';
import {
  FormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormArray,
  ValidatorFn,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf, NgFor, DatePipe } from '@angular/common';
import { AdmissionService } from '../admission.service';
import { PersonalStepComponent } from './personal-step/personal-step.component';
import { AcademicStepComponent } from './academic-step/academic-step.component';
import { FamilyStepComponent } from './family-step/family-step.component';
import { DocumentsStepComponent } from './documents-step/documents-step.component';

interface BpharmYearForm {
  year: FormControl<string | null>;
  semesters: FormArray<FormGroup<SemesterForm>>;
}

interface SemesterForm {
  semester: FormControl<string | null>;
  marks: FormControl<null | string>; // if marks may be an empty string initially, include string
  passingDate: FormControl<string | null>;
}

@Component({
  selector: 'app-admission-stepper',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    // NgIf,
    NgFor,
    PrimengImportsModule,
    PersonalStepComponent,
    AcademicStepComponent,
    FamilyStepComponent,
    DocumentsStepComponent,
  ],
  templateUrl: './admission-stepper.component.html',
  styleUrl: './admission-stepper.component.scss',
  providers: [MessageService, DatePipe],
})
export class AdmissionStepperComponent implements OnInit {
  currentStep = 1;
  items = [
    { label: 'Personal', stepValue: 1 },
    { label: 'Academic', stepValue: 2 },
    { label: 'Family', stepValue: 3 },
    { label: 'Documents', stepValue: 4 },
  ];

  // Form Data Options
  bloodGroups = [
    { label: 'A+', value: 'A+' },
    { label: 'B+', value: 'B+' },
    { label: 'O+', value: 'O+' },
    { label: 'AB+', value: 'AB+' },
    { label: 'A-', value: 'A-' },
    { label: 'B-', value: 'B-' },
    { label: 'O-', value: 'O-' },
    { label: 'AB-', value: 'AB-' },
  ];

  categories = [
    { label: 'Open', value: 'open' },
    { label: 'SC', value: 'sc' },
    { label: 'ST', value: 'st' },
    { label: 'OBC', value: 'obc' },
    { label: 'VI', value: 'vi' },
    { label: 'DT', value: 'dt' },
    { label: 'NT1', value: 'nt1' },
    { label: 'NT2', value: 'nt2' },
    { label: 'NT3', value: 'nt3' },
    { label: 'Hindi Speaking Minority', value: 'hindiMinority' },
    { label: 'Other', value: 'other' },
  ];

  exams = [
    { label: 'SSC', value: 'SSC' },
    { label: 'HSC', value: 'HSC' },
    { label: 'Diploma of Pharmacy Final Year', value: 'Diploma' },
  ];

  requiredDocuments = [
    { label: 'D. Pharmacy Mark List', name: 'pharmacyMarks' },
    { label: 'S.S.C Certificate', name: 'ssc' },
    { label: 'H.S.C Certificate', name: 'hsc' },
    { label: 'MHT CET Score Card', name: 'mhtcet' },
    { label: 'College Leaving Certificate', name: 'leavingCert' },
    { label: 'Birth Certificate', name: 'birthCert' },
    { label: 'Caste Certificate', name: 'casteCert' },
    { label: 'Non-Creamy Layer Certificate', name: 'nonCreamy' },
    { label: 'Aadhaar Card', name: 'aadhaar' },
    { label: 'PAN Card', name: 'pan' },
    { label: 'Bank Passbook', name: 'passbook' },
    { label: 'Physical Fitness Certificate', name: 'fitnessCert' },
  ];

  // Form Control
  admissionForm!: FormGroup;
  uploadedDocuments: { [key: string]: File } = {};
  showConfirmation = false;
  confirmationData: any[] = [];
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private messageService: MessageService,
    private admissionService: AdmissionService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  // Initialize main form structure
  private initializeForm(): void {
    this.admissionForm = this.fb.group({
      personalDetails: this.fb.group({
        lastName: ['', [Validators.required, Validators.maxLength(50)]],
        firstName: ['', [Validators.required, Validators.maxLength(50)]],
        parentName: ['', [Validators.required, Validators.maxLength(100)]],
        dob: ['', [Validators.required, this.ageValidator(18)]],
        bloodGroup: [''],
        gender: ['Male', Validators.required],
        panNumber: ['', [Validators.required, this.panValidator()]],
        aadharNumber: [
          '',
          [Validators.required, Validators.pattern(/^\d{12}$/)],
        ],
        residentialAddress: [
          '',
          [Validators.required, Validators.maxLength(200)],
        ],
        permanentAddress: [''],
        ...this.createCategoryControls(),
      }),
      academicDetails: this.fb.group({
        academicQualifications: this.fb.array([
          this.createAcademicQualification(),
        ]),
        bpharmYears: this.fb.array(
          [
            this.createBpharmYear('First Year', ['I', 'II']),
            this.createBpharmYear('Second Year', ['III', 'IV']),
            this.createBpharmYear('Third Year', ['V', 'VI']),
          ],
          [this.validateBpharmYears()]
        ),
        mhtcetScore: [
          '',
          [Validators.required, Validators.min(0), Validators.max(100)],
        ],
      }),
      parentDetails: this.fb.group({
        fatherName: ['', Validators.required],
        fatherOccupation: ['', Validators.required],
        fatherIncome: [''],
        motherName: ['', Validators.required],
        motherOccupation: ['', Validators.required],
        motherIncome: [''],
      }),
      references: this.fb.array([this.createReference()]),
      documents: this.fb.array([]),
      agreeTerms: [false, Validators.requiredTrue],
      studentSignature: ['', Validators.required],
      parentSignature: ['', Validators.required],
      declarationDate: ['', Validators.required],
    });
  }

  // Custom Validators
  private ageValidator(minAge: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const birthDate = new Date(control.value);
      const ageDiff = Date.now() - birthDate.getTime();
      const ageDate = new Date(ageDiff);
      const age = Math.abs(ageDate.getUTCFullYear() - 1970);
      return age >= minAge ? null : { underage: true };
    };
  }

  private panValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isValid = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(control.value);
      return isValid ? null : { invalidPan: true };
    };
  }

  private validateBpharmYears(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const years = control.value;
      let isValid = true;

      years.forEach((year: any) => {
        year.semesters.forEach((semester: any) => {
          if (semester.marks < 0 || semester.marks > 100) {
            isValid = false;
          }
        });
      });

      return isValid ? null : { invalidMarks: true };
    };
  }

  // Form Array Creators
  private createAcademicQualification(): FormGroup {
    return this.fb.group({
      examination: ['SSC', Validators.required],
      board: ['', Validators.required],
      passingDate: ['', Validators.required],
      marks: [
        '',
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
    });
  }

  private createBpharmYear(
    year: string,
    semesters: string[]
  ): FormGroup<BpharmYearForm> {
    return this.fb.group({
      year: [year, Validators.required],
      semesters: this.fb.array(
        semesters.map((sem) =>
          this.fb.group({
            semester: [sem, Validators.required],
            marks: [
              '',
              [Validators.required, Validators.min(0), Validators.max(100)],
            ],
            passingDate: ['', Validators.required],
          })
        )
      ),
    });
  }

  private createReference(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      contact: ['', Validators.required],
      profession: [''],
    });
  }

  private createCategoryControls() {
    const categoryGroup: { [key: string]: any } = {};
    this.categories.forEach((category) => {
      categoryGroup[category.value] = [false];
    });
    return categoryGroup;
  }

  get academicDetails() {
    return this.admissionForm.get('academicDetails') as FormGroup;
  }

  // Form Array Getters
  get academicQualifications() {
    return this.academicDetails.get('academicQualifications') as FormArray;
  }

  get bpharmYears() {
    return this.admissionForm.get('bpharmYears') as FormArray;
  }

  get mhtcetScore() {
    return this.admissionForm.get('mhtcetScore') as FormControl;
  }

  get references() {
    return this.admissionForm.get('references') as FormArray;
  }

  get documents() {
    return this.admissionForm.get('documents') as FormArray;
  }

  get personalDetails() {
    return this.admissionForm.get('personalDetails') as FormGroup;
  }

  get parentDetails() {
    return this.admissionForm.get('parentDetails') as FormGroup;
  }

  get agreeTerms() {
    return this.admissionForm.get('agreeTerms') as FormControl;
  }

  get personalDetailsGroup(): FormGroup {
    return this.admissionForm.get('personalDetails') as FormGroup;
  }

  get bpharmYearsArray(): FormArray {
    return this.admissionForm.get('bpharmYears') as FormArray;
  }

  get parentDetailsGroup(): FormGroup {
    return this.admissionForm.get('parentDetails') as FormGroup;
  }

  get referencesArray(): FormArray {
    return this.admissionForm.get('references') as FormArray;
  }

  get documentsArray(): FormArray {
    return this.admissionForm.get('documents') as FormArray;
  }

  // Individual Controls
  get mhtcetScoreControl(): FormControl {
    return this.admissionForm.get('mhtcetScore') as FormControl;
  }

  get agreeTermsControl(): FormControl {
    return this.admissionForm.get('agreeTerms') as FormControl;
  }

  get studentSignatureControl(): FormControl {
    return this.admissionForm.get('studentSignature') as FormControl;
  }

  get parentSignatureControl(): FormControl {
    return this.admissionForm.get('parentSignature') as FormControl;
  }

  get declarationDateControl(): FormControl {
    return this.admissionForm.get('declarationDate') as FormControl;
  }

  // Nested Controls
  get categoriesGroup(): FormGroup {
    return this.personalDetailsGroup.get('categories') as FormGroup;
  }

  // ======================
  // FORM ARRAY GETTERS
  // ======================

  getYearSemesters(yearIndex: number): FormArray {
    return this.bpharmYearsArray.at(yearIndex).get('semesters') as FormArray;
  }

  getQualificationControls(index: number): FormGroup {
    return this.academicQualifications.at(index) as FormGroup;
  }

  getReferenceControls(index: number): FormGroup {
    return this.referencesArray.at(index) as FormGroup;
  }

  getDocumentControls(index: number): FormGroup {
    return this.documentsArray.at(index) as FormGroup;
  }

  // ======================
  // INDIVIDUAL FIELD GETTERS
  // ======================

  get lastNameControl(): FormControl {
    return this.personalDetailsGroup.get('lastName') as FormControl;
  }

  get firstNameControl(): FormControl {
    return this.personalDetailsGroup.get('firstName') as FormControl;
  }

  get parentNameControl(): FormControl {
    return this.personalDetailsGroup.get('parentName') as FormControl;
  }

  get dobControl(): FormControl {
    return this.personalDetailsGroup.get('dob') as FormControl;
  }

  get bloodGroupControl(): FormControl {
    return this.personalDetailsGroup.get('bloodGroup') as FormControl;
  }

  get genderControl(): FormControl {
    return this.personalDetailsGroup.get('gender') as FormControl;
  }

  get panNumberControl(): FormControl {
    return this.personalDetailsGroup.get('panNumber') as FormControl;
  }

  get aadharNumberControl(): FormControl {
    return this.personalDetailsGroup.get('aadharNumber') as FormControl;
  }

  get residentialAddressControl(): FormControl {
    return this.personalDetailsGroup.get('residentialAddress') as FormControl;
  }

  get permanentAddressControl(): FormControl {
    return this.personalDetailsGroup.get('permanentAddress') as FormControl;
  }

  /////////////Hello/////////////////////

  // Form Operations
  addQualification(): void {
    console.log('INSIDE FUNCTION');
    this.academicQualifications.push(this.createAcademicQualification());
  }

  removeQualification(index: number) {
    this.academicQualifications.removeAt(index);
    this.messageService.add({
      severity: 'success',
      summary: 'Removed',
      detail: 'Qualification removed successfully',
    });
  }

  addReference(): void {
    this.references.push(this.createReference());
  }

  // Navigation
  nextStep(): void {
    if (this.isStepValid(this.currentStep)) {
      this.currentStep++;
    } else {
      this.handleFormErrors();
    }
    this.currentStep++;
  }

  previousStep(): void {
    this.currentStep--;
  }

  isStepValid(step: number): boolean {
    switch (step) {
      case 0:
        return this.personalDetails.valid;
      case 1:
        return (
          this.academicQualifications?.valid &&
          this.bpharmYears?.valid &&
          this.mhtcetScore?.valid
        );
      case 2:
        return this.parentDetails.valid && this.references.valid;
      case 3:
        return this.validateDocuments() && this.agreeTerms.valid;
      default:
        return false;
    }
  }

  private validateDocuments(): boolean {
    return this.requiredDocuments.every(
      (doc) => this.uploadedDocuments[doc.name]
    );
  }

  // Form Submission
  submitForm(): void {
    if (this.admissionForm.valid && this.validateDocuments()) {
      this.isSubmitting = true;
      const formData = this.prepareFormData();

      this.admissionService.submitApplication(formData).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Application submitted successfully',
          });
          this.resetForm();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Submission failed: ' + err.message,
          });
        },
        complete: () => {
          this.isSubmitting = false;
          this.showConfirmation = false;
        },
      });
    } else {
      this.handleFormErrors();
    }
  }

  private prepareFormData(): any {
    const formValue = this.admissionForm.value;
    return {
      ...formValue,
      personalDetails: {
        ...formValue.personalDetails,
        dob: this.formatDate(formValue.personalDetails.dob),
      },
      academicQualifications: formValue.academicQualifications.map(
        (q: any) => ({
          ...q,
          passingDate: this.formatDate(q.passingDate),
        })
      ),
      bpharmYears: formValue.bpharmYears.map((year: any) => ({
        ...year,
        semesters: year.semesters.map((sem: any) => ({
          ...sem,
          passingDate: this.formatDate(sem.passingDate),
        })),
      })),
      documents: this.requiredDocuments.map((doc) => ({
        name: doc.name,
        url: this.uploadedDocuments[doc.name],
      })),
      declarationDate: this.formatDate(formValue.declarationDate),
    };
  }

  private formatDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
  }

  private handleFormErrors(): void {
    this.admissionForm.markAllAsTouched();
    this.messageService.add({
      severity: 'error',
      summary: 'Form Invalid',
      detail: 'Please fill all required fields correctly',
    });
  }

  resetForm(): void {
    this.admissionForm.reset();
    this.currentStep = 0;
    this.uploadedDocuments = {};
    this.initializeForm();
  }
}
