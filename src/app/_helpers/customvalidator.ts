import { AbstractControl } from '@angular/forms';
export function removeSpaces(control: AbstractControl) {
  console.log(control);
  if (control && control.value) {
    if(!control.value.toString().replace(/\s/g, '').length){
      control.setValue('');
    } 
  }
  return null;
}