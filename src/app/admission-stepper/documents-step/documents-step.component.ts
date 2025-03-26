import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { PrimengImportsModule } from '../../primeng-import';

import { Form, FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AdmissionService } from '../../admission.service';
@Component({
  selector: 'app-documents-step',
  imports: [PrimengImportsModule],
  templateUrl: './documents-step.component.html',
  styleUrl: './documents-step.component.scss',
  providers: [MessageService],
})
export class DocumentsStepComponent {
  private admissionService = inject(AdmissionService);
  private messageService = inject(MessageService);

  @Input() documents: any[] = [];
  @Input() agreeTerms!: FormControl;
  @Input() studentSignature!: FormControl;
  @Input() parentSignature!: FormControl;
  @Input() declarationDate!: FormControl;
  @Output() documentUrl = new EventEmitter<string>();

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

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
