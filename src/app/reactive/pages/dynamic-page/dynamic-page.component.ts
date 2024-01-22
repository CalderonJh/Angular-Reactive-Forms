import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder, FormControl,
  FormGroup,
  Validators as V,
} from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: ``,
})
export class DynamicPageComponent {
  constructor(private formBuilder: FormBuilder) {}

  public formGroup: FormGroup = this.formBuilder.group({
    name: ['', [V.required, V.minLength(3)], []],
    favorites: this.formBuilder.array([
      ['game1', V.required],
      ['game2', V.required],
    ]),
    new_favorite: ['', [V.required]],
  });

  get favoritesControl() {
    return this.formGroup.get('favorites') as FormArray;
  }
  get newFavoriteControl(): FormControl {
    return this.formGroup.get('new_favorite') as FormControl;
  }


  invalidField(field: string ): boolean | null {
    return this.formGroup.controls[field].errors
      && this.formGroup.controls[field].touched;
  }


  isValidFieldInArray( formArray: FormArray, index: number ) {
    return formArray.controls[index].errors
      && formArray.controls[index].touched;
  }


  getFieldError( field: string ): string | null {

    if ( !this.formGroup.controls[field] ) return null;

    const errors = this.formGroup.controls[field].errors || {};

    for (const key of Object.keys(errors) ) {
      switch( key ) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo ${ errors['minlength'].requiredLength } caracters.`;
      }
    }

    return null;
  }


  onAddToFavorites():void {

    if ( this.newFavoriteControl.invalid ) return;
    const newGame = this.newFavoriteControl.value;

    this.favoritesControl.push(
      this.formBuilder.control( newGame, V.required )
    );

    this.newFavoriteControl.reset();
  }


  onDeleteFavorite( index:number ):void {
    this.favoritesControl.removeAt(index);
  }

  onSubmit():void {
    if ( this.formGroup.invalid ) {
      this.formGroup.markAllAsTouched();
      return;
    }

    console.log(this.formGroup.value);
    (this.formGroup.controls['favoriteGames'] as FormArray ) = this.formBuilder.array([]);
    this.formGroup.reset();
  }

}
