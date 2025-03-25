import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdmissionStepperComponent } from './admission-stepper/admission-stepper.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [AdmissionStepperComponent],
})
export class AppComponent {
  title = 'tailwindAngular';
}
