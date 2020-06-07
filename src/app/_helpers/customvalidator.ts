import { ValidatorFn,AbstractControl, Validators } from '@angular/forms';
import * as moment from 'moment';
export function removeSpaces(control: AbstractControl) {
  if (control && control.value) {
    if(!control.value.toString().replace(/\s/g, '').length){
      control.setValue('');
    } 
  }
  return null;
}

export function overEighteen(control: AbstractControl) {
  const dob = control.value;
  const today = moment().startOf('day');
  const delta = today.diff(dob, 'years', false);
  if (delta <= 18) {
    return { overEighteen: true };
  }
  return null;
}


export function passwordDateConditionallyRequiredValidator(formControl: AbstractControl) {
  if (!formControl) {
    return null;
  }
  console.log(formControl.get('number').value);
  if (formControl.get('number').value && formControl.get('number').value!='') {
      formControl.get('valid_from').setErrors( {required: true} );
      formControl.get('valid_till').setErrors( {required: true} );
      return true;
  }
  return null;
}