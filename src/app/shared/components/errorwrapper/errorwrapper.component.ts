import { Component, ContentChild, contentChild, input } from '@angular/core';
import { Form, FormControl, NgControl } from '@angular/forms';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-errorwrapper',
  imports: [MessageModule],
  templateUrl: './errorwrapper.component.html',
  styleUrl: './errorwrapper.component.scss',
})
export class ErrorwrapperComponent {
  @ContentChild(NgControl) control1!: FormControl;
  readonly control = input<FormControl | null>(null);
  readonly label = input<string>('');
  readonly id = input<string>('');
  readonly ErrorLabel = input<string>('');

  getErrorMessage(): string {
    if (!this.control1) return '';

    const ErrorLabel = this.ErrorLabel();
    const errorMessages: { [key: string]: string } = {
      required: `${
        ErrorLabel ? ErrorLabel : this.label()
      } is required.`,
      underage: `Underage`,
      minlength: `Minimum length is ${
        this.control1.getError('minlength')?.requiredLength
      } characters.`,
      maxlength: `Maximum length is ${
        this.control1.getError('maxlength')?.requiredLength
      } characters.`,
      email: 'Enter a valid email address.',
    };

    // Check if the control1 is touched and dirty
    if (this.control1.dirty) {
      for (const errorKey in this.control1.errors) {
        if (this.control1.hasError(errorKey)) {
          return errorMessages[errorKey] || 'Invalid input.';
        }
      }
    }

    return '';
  }
}
