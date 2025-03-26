import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { StepsModule } from 'primeng/steps';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { StepperModule } from 'primeng/stepper';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { TextareaModule } from 'primeng/textarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TabsModule } from 'primeng/tabs';
import { NgModule } from '@angular/core';
@NgModule({
  imports: [
    DatePickerModule,
    SelectModule,
    ButtonModule,
    FileUploadModule,
    DialogModule,
    CheckboxModule,
    InputTextModule,
    TextareaModule,
    RadioButtonModule,
    StepsModule,
    TabsModule,
    TableModule,
    StepperModule,
  ],
  exports: [
    DatePickerModule,
    SelectModule,
    ButtonModule,
    FileUploadModule,
    DialogModule,
    CheckboxModule,
    InputTextModule,
    TextareaModule,
    RadioButtonModule,
    StepsModule,
    TabsModule,
    TableModule,
    StepperModule,
  ],
  providers: [],
})
export class PrimengImportsModule {}
