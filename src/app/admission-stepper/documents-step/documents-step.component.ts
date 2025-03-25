import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PrimengImportsModule } from '../../primeng-import';
import { NgIf, NgFor } from '@angular/common';
import { Form, FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AdmissionService } from '../../admission.service';
@Component({
  selector: 'app-documents-step',
  imports: [PrimengImportsModule, NgIf, NgFor],
  templateUrl: './documents-step.component.html',
  styleUrl: './documents-step.component.scss',
  providers: [MessageService],
})
export class DocumentsStepComponent {
  @Input() documents: any[] = [];
  @Input() agreeTerms!: FormControl;
  @Input() studentSignature!: FormControl;
  @Input() parentSignature!: FormControl;
  @Input() declarationDate!: FormControl;
  @Output() documentUrl = new EventEmitter<string>();

  constructor(
    private admissionService: AdmissionService,
    private messageService: MessageService
  ) {}

  onDocumentSelect(event: any, docName: string): void {
    if (event.files.length > 0) {
      this.uploadDocument(event.files[0], docName);
    }
  }

  private uploadDocument(file: File, docName: string): void {
    const formData = new FormData();
    formData.append('file', file);

    this.admissionService.uploadDocument(formData).subscribe({
      next: (response) => {
        this.documentUrl.emit(response.url);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Upload Failed',
          detail: `Could not upload ${docName} document`,
        });
      },
    });
  }
}
