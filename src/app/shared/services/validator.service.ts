import { Injectable } from '@angular/core';
import {FormControl, ValidationErrors} from "@angular/forms";

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
}
