import { Component, contentChild, input } from '@angular/core';
import { Form, FormControl, NgControl } from '@angular/forms';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-errorwrapper',
  imports: [MessageModule],
  templateUrl: './errorwrapper.component.html',
  styleUrl: './errorwrapper.component.scss',
})
export class ErrorwrapperComponent {
  readonly control = contentChild.required(NgControl);
  readonly label = input<string>('');
  readonly id = input<string>('');
  readonly ErrorLabel = input<string>('');

  getErrorMessage(): string {
    const control = this.control();
    if (!control) return '';

    const ErrorLabel = this.ErrorLabel();
    const errorMessages: { [key: string]: string } = {
      required: `${ErrorLabel ? ErrorLabel : this.label()} is required.`,
      underage: `Underage`,
      minlength: `Minimum length is ${
        control.getError('minlength')?.requiredLength
      } characters.`,
      maxlength: `Maximum length is ${
        control.getError('maxlength')?.requiredLength
      } characters.`,
      email: 'Enter a valid email address.',
    };

    // Check if the control is touched and dirty
    if (control.dirty) {
      for (const errorKey in control.errors) {
        if (control.hasError(errorKey)) {
          return errorMessages[errorKey] || 'Invalid input.';
        }
      }
    }

    return '';
  }
}
