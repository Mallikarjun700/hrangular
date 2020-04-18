import { AbstractControl } from '@angular/forms';
export function removeSpaces(control: AbstractControl) {
  if (control && control.value) {
    if(!control.value.toString().replace(/\s/g, '').length){
      control.setValue('');
    } 
  }
  return null;
}