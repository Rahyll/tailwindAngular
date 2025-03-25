import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { StepsModule } from 'primeng/steps';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
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
  ],
  providers: [],
})
export class PrimengImportsModule {}
