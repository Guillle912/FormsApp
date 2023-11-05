import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basic-page',
  templateUrl: './basic-page.component.html',
  styleUrls: ['./basic-page.component.css']
})
export class BasicPageComponent implements OnInit {


  myForm: FormGroup = new FormGroup ({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    price: new FormControl(null, [Validators.required, Validators.min(5), Validators.max(30)] ),
    inStorage: new FormControl(null,[Validators.required, Validators.min(0)])
  });

  ngOnInit(): void {
    this.myForm.reset()
  }

  isValidField( field: string ){
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  getFieldError( field: string ) {
    if ( !this.myForm.controls[field] ) return null
    const errors = this.myForm.controls[field].errors || {}

    for(const key of Object.keys(errors) ){
      switch(key) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Minimo ${ errors['minlength'].requiredLength } caracteres`

        case 'maxlength':
          return `Maximo ${ errors['maxlength'].requiredLength } caracteres`

        case 'min':
          return `Minimo ${ errors['min'].requiredLength } `

        case 'max':
          return `Maximo ${ errors['max'].requiredLength }`


      }
    }
    return null
  }

  onSave(){

    if(this.myForm.invalid){
      this.myForm.markAllAsTouched()
      return
    }

    console.log( this.myForm.value );

    this.myForm.reset();
  }
}
