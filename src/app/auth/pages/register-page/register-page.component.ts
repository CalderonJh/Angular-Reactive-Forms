import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators as v } from '@angular/forms';
import {
  formControlName,
  ValidatorService,
} from '../../../shared/services/validator.service';
import { EmailValidatorService } from '../../../shared/services/email-validator.service';

@Component({
  selector: 'auth-register-page',
  templateUrl: './register-page.component.html',
  styles: ``,
})
export class RegisterPageComponent {
  public formGroup: FormGroup = this.formBuilder.group(
    {
      name: [
        '',
        [v.required, v.pattern(this.validatorService.fullNamePattern)],
      ],
      email: [
        '',
        [v.required, v.pattern(this.validatorService.emailPattern)],
        [new EmailValidatorService()],
      ],
      username: [
        '',
        [
          v.required,
          this.validatorService.isAvailableUsername.bind(this.validatorService),
          this.validatorService.hasNoSpaces.bind(this.validatorService),
        ],
      ],
      password: ['', [v.required, v.minLength(8)]],
      confirmPassword: ['', [v.required]],
    },
    {
      validators: [
        this.validatorService.fieldValuesMatch('password', 'confirmPassword'),
      ],
    },
  );

  constructor(
    private formBuilder: FormBuilder,
    private validatorService: ValidatorService,
  ) {}

  isInvalidField(fieldName: formControlName) {
    // @ts-ignore
    return this.validatorService.isInvalidField(this.formGroup.get(fieldName));
  }

  onSubmit() {
    this.formGroup.markAllAsTouched();
  }
}
