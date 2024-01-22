import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators as V } from '@angular/forms';

@Component({
  templateUrl: './switches-page.component.html',
  styles: ``,
})
export class SwitchesPageComponent {
  person = {
    gender: 'F',
    wantsNotifications: false,
  };

  constructor(private formBuilder: FormBuilder) {}

  public formGroup: FormGroup = this.formBuilder.group({
    gender: ['M', [V.required], []],
    wantsNotifications: [false, V.required],
    acceptTermsAndConditions: [false, [V.requiredTrue]],
  });

  get acceptTermsAndConditionsControl() {
    return this.formGroup.get('acceptTermsAndConditions');
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      this.acceptTermsAndConditionsControl?.markAsTouched();
      return;
    }

    const { acceptTermsAndConditions, ...person } = this.formGroup.value;
    this.person = person;
    console.log(person);
    this.formGroup.reset({
      wantsNotifications: false,
    });
  }

  termsNotAccepted() {
    return (
      this.acceptTermsAndConditionsControl?.invalid &&
      this.acceptTermsAndConditionsControl?.touched
    );
  }
}
