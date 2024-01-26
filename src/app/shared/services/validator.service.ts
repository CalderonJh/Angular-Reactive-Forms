import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';

export type formControlName =
  | 'name'
  | 'email'
  | 'username'
  | 'password'
  | 'confirmPassword';

@Injectable({ providedIn: 'root' })
export class ValidatorService {
  public fullNamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  private username: string = '';
  private takenUsernames = ['jhonsenaxd'];

  constructor() {}

  isAvailableUsername(formControl: FormControl): ValidationErrors | null {
    this.username = formControl.value;
    if (this.usernameIsTaken()) return { isAvailable: true };
    else return null;
  }

  usernameIsTaken() {
    return this.takenUsernames.includes(this.username);
  }

  hasNoSpaces(formControl: FormControl): ValidationErrors | null {
    return formControl.value.includes(' ') ? { noSpaces: true } : null;
  }

  isInvalidField(formControl: FormControl) {
    if (formControl) return formControl.errors && formControl.touched;
    return true;
  }

  fieldValuesMatch(fieldName1: formControlName, fieldName2: formControlName) {
    return (formGroup: FormGroup): ValidationErrors | null => {
      const value1 = formGroup.get(fieldName1)?.value;
      const value2 = formGroup.get(fieldName2)?.value;
      let err = value1 !== value2 ? {notEqual: true} : null;
      formGroup.get(fieldName2)?.setErrors(err);
      return err;
    };
  }
}
