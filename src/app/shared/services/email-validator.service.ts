import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailValidatorService implements AsyncValidator {
  constructor() {}
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;

    return new Observable<ValidationErrors | null>((subscriber) => {
      if (email == 'example@correo.com') {
        subscriber.next({
          emailTaken: {
            message: 'This email is already in use',
          },
        });
        subscriber.complete();
      }
      subscriber.next(null);
    });
    /*
    return of({
      emailTaken: true,
    }).pipe(delay(1500));*/
  }
}
