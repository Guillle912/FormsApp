import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html',
  styleUrls: ['./dynamic-page.component.css']
})
export class DynamicPageComponent {

  fb = inject(FormBuilder);

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favouriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['The witcher 3', Validators.required],
    ]),
  })

  newFavourite: FormControl = new FormControl( null, Validators.required )

  get favouriteGames(){
    return this.myForm.get('favouriteGames') as FormArray;
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

  isValidFieldInArray( formArray: FormArray, index: number ){
    return formArray.controls[index].errors && formArray.controls[index].touched;
  }

  onDeleteFavourite( index: number ){
    this.favouriteGames.removeAt( index );
  }

  onAddToFavourites( ){
    if( this.newFavourite.invalid ) return;

    this.favouriteGames.push( this.fb.control( this.newFavourite.value, Validators.required ));

    this.newFavourite.reset()
  }

  onSubmit(){

    if( this.myForm.invalid ){
      this.myForm.markAllAsTouched();
      return
    }

    console.log(this.myForm.value);
    (this.myForm.controls['favouriteGames'] as FormArray ) = this.fb.array([])
    this.myForm.reset();
  }

}
