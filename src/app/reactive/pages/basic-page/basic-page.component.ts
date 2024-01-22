import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators as v } from '@angular/forms';

type Inputs = 'name' | 'price' | 'stock';
type Errors = 'required' | 'minlength' | 'min' | 'none';

@Component({
  selector: 'reactive-basic-page',
  templateUrl: './basic-page.component.html',
  styleUrl: './basic-page.component.css',
})
export class BasicPageComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  mapError: Record<Errors, string> = {
    required: 'Este campo es requerido',
    minlength: 'Mínimo tres caracteres',
    min: 'El valor mínimo es 0 (cero)',
    none:''
  };


  public formGroup = this.formBuilder.group({
    name: ['', [v.required, v.minLength(3)], []],
    price: [0, [v.required, v.min(0)], []],
    stock: [0, [v.required, v.min(0)], []],
  });


  invalidField(field: Inputs): boolean | null {
    return (
      this.formGroup.controls[field].errors &&
      this.formGroup.controls[field].touched
    );
  }


  onSave() {
    if (this.formGroup.invalid) return;
    console.log(this.formGroup.value);
    this.formGroup.reset({ name: '', price: 0, stock: 0 });
  }


  getFieldError(field: Inputs) {
    if (!this.formGroup.controls[field]) return '';
    const errors = this.formGroup.controls[field].errors || {none:''};
    // @ts-ignore
    return this.mapError[Object.keys(errors)[0]]
  }
}
