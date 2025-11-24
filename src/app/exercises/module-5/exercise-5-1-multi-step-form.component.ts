import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';

/**
 * Exercise 5-1: Complex Multi-Step Form
 * 
 * Objetivo: Crear un formulario multi-paso con:
 * - Validación avanzada (custom + async)
 * - Dynamic form arrays/groups
 * - Signals + Forms integration
 */

interface FormData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  address: {
    street: string;
    city: string;
    zipCode: string;
    country: string;
  };
  preferences: {
    newsletter: boolean;
    notifications: boolean;
    language: string;
  };
}

@Component({
  selector: 'app-exercise-5-1-multi-step-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './exercise-5-1-multi-step-form.component.html',
  styleUrl: './exercise-5-1-multi-step-form.component.css'
})
export class Exercise51MultiStepFormComponent {
  currentStep = signal<number>(1);
  totalSteps = 3;
  formSubmitted = signal<boolean>(false);
  submittedData = signal<FormData | null>(null);

  form: FormGroup;

  // Computed: información del paso actual
  stepInfo = computed(() => {
    const step = this.currentStep();
    const steps = [
      { title: 'Personal Information', description: 'Enter your personal details' },
      { title: 'Address', description: 'Enter your address information' },
      { title: 'Preferences', description: 'Configure your preferences' }
    ];
    return steps[step - 1];
  });

  // Computed: validación del paso actual
  isCurrentStepValid = computed(() => {
    const step = this.currentStep();
    switch (step) {
      case 1:
        return this.form.get('personalInfo')?.valid ?? false;
      case 2:
        return this.form.get('address')?.valid ?? false;
      case 3:
        return this.form.get('preferences')?.valid ?? false;
      default:
        return false;
    }
  });

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      personalInfo: this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email], [this.asyncEmailValidator.bind(this)]],
        phone: ['', [Validators.required, this.phoneValidator]]
      }),
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        zipCode: ['', [Validators.required, this.zipCodeValidator]],
        country: ['', Validators.required]
      }),
      preferences: this.fb.group({
        newsletter: [false],
        notifications: [true],
        language: ['en', Validators.required]
      })
    });
  }

  // Custom validator: Phone number
  phoneValidator(control: AbstractControl): ValidationErrors | null {
    const phone = control.value;
    if (!phone) return null;
    
    const phoneRegex = /^\+?[\d\s-()]+$/;
    if (!phoneRegex.test(phone)) {
      return { invalidPhone: true };
    }
    return null;
  }

  // Custom validator: Zip code
  zipCodeValidator(control: AbstractControl): ValidationErrors | null {
    const zipCode = control.value;
    if (!zipCode) return null;
    
    const zipRegex = /^\d{5}(-\d{4})?$/;
    if (!zipRegex.test(zipCode)) {
      return { invalidZipCode: true };
    }
    return null;
  }

  // Async validator: Email availability (simulado)
  asyncEmailValidator(control: AbstractControl): Promise<ValidationErrors | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const email = control.value;
        // Simular verificación: emails que terminan en @test.com no están disponibles
        if (email && email.endsWith('@test.com')) {
          resolve({ emailTaken: true });
        } else {
          resolve(null);
        }
      }, 1000);
    });
  }

  // Métodos de navegación
  nextStep() {
    if (this.isCurrentStepValid() && this.currentStep() < this.totalSteps) {
      this.currentStep.update(step => step + 1);
    }
  }

  previousStep() {
    if (this.currentStep() > 1) {
      this.currentStep.update(step => step - 1);
    }
  }

  goToStep(step: number) {
    if (step >= 1 && step <= this.totalSteps) {
      this.currentStep.set(step);
    }
  }

  // Submit
  onSubmit() {
    if (this.form.valid) {
      this.submittedData.set(this.form.value as FormData);
      this.formSubmitted.set(true);
    } else {
      // Marcar todos los campos como touched
      Object.keys(this.form.controls).forEach(key => {
        const control = this.form.get(key);
        if (control instanceof FormGroup) {
          Object.keys(control.controls).forEach(subKey => {
            control.get(subKey)?.markAsTouched();
          });
        } else {
          control?.markAsTouched();
        }
      });
    }
  }

  // Reset
  resetForm() {
    this.form.reset();
    this.currentStep.set(1);
    this.formSubmitted.set(false);
    this.submittedData.set(null);
  }

  // Helpers para obtener errores
  getFieldError(groupName: string, fieldName: string): string {
    const control = this.form.get(`${groupName}.${fieldName}`);
    if (control && control.touched && control.errors) {
      if (control.errors['required']) return `${fieldName} is required`;
      if (control.errors['minlength']) return `${fieldName} must be at least ${control.errors['minlength'].requiredLength} characters`;
      if (control.errors['email']) return 'Invalid email format';
      if (control.errors['invalidPhone']) return 'Invalid phone number format';
      if (control.errors['invalidZipCode']) return 'Invalid zip code format (e.g., 12345 or 12345-6789)';
      if (control.errors['emailTaken']) return 'This email is already taken';
    }
    return '';
  }
}

