import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { removeSpaces } from '../../../../../_helpers';

@Component({
  selector: 'app-sub-component',
  templateUrl: './sub-component.component.html',
  styleUrls: ['./sub-component.component.scss']
})
export class SubComponentComponent implements OnInit {
  public formdata: any;
  public dropdown: any;
  fixedForumulaFormGroup: FormGroup;
  public NUMBER = /^(0|[1-9][0-9]*)$/;
  public PERCENTAGE = /(^100(\.0{1,2})?$)|(^([1-9]([0-9])?|0)(\.[0-9]{1,2})?$)/;
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<SubComponentComponent>, @Inject(MAT_DIALOG_DATA) data
  ) {
    this.formdata = data;
  }

  formControlValueChanged() {
    const basevalueControl = this.fixedForumulaFormGroup.get('basevalue');
    this.fixedForumulaFormGroup.get('type').valueChanges.subscribe(
      (mode: string) => {
        console.log(mode);
        console.log(this.formdata.formula);
        if (mode === '1' && this.formdata.formula === '1') {
          basevalueControl.setValidators([Validators.required, removeSpaces, Validators.pattern(this.PERCENTAGE)]);
        } else {
          basevalueControl.setValidators([Validators.required, removeSpaces, Validators.pattern(this.NUMBER)]);
        }
        basevalueControl.updateValueAndValidity();
      });
    const result_ifvalueControl = this.fixedForumulaFormGroup.get('result_if');
    this.fixedForumulaFormGroup.get('result_if_type').valueChanges.subscribe(
      (mode: string) => {
        console.log(mode);
        console.log(this.formdata.formula);
        if (mode === '1' && this.formdata.formula === '2') {
          result_ifvalueControl.setValidators([Validators.required, removeSpaces, Validators.pattern(this.PERCENTAGE)]);
        } else {
          result_ifvalueControl.setValidators([Validators.required, removeSpaces, Validators.pattern(this.NUMBER)]);
        }
        result_ifvalueControl.updateValueAndValidity();
      });
    const result_elsevalueControl = this.fixedForumulaFormGroup.get('result_else');
    this.fixedForumulaFormGroup.get('result_else_type').valueChanges.subscribe(
      (mode: string) => {
        console.log(mode);
        console.log(this.formdata.formula);
        if (mode === '1' && this.formdata.formula === '2') {
          result_elsevalueControl.setValidators([Validators.required, removeSpaces, Validators.pattern(this.PERCENTAGE)]);
        } else {
          result_elsevalueControl.setValidators([Validators.required, removeSpaces, Validators.pattern(this.NUMBER)]);
        }
        result_elsevalueControl.updateValueAndValidity();
      });
  }
  initiateESIFormGroup(data?: any) {
    this.fixedForumulaFormGroup = this.formBuilder.group({
      base: [(data) ? data.base : 1, [Validators.required, removeSpaces]],
      type: [(data) ? data.type : 1, [Validators.required, removeSpaces]],
      basevalue: [(data) ? data.basevalue : 1],
      result_if_type: [(data) ? data.result_if_type : 1, ((this.formdata.formula === '2') ? [Validators.required, removeSpaces] : [])],
      result_if: [(data) ? data.result_if : 0],
      result_else_type: [(data) ? data.result_else_type : 1, ((this.formdata.formula === '2') ? [Validators.required, removeSpaces] : [])],
      result_else: [(data) ? data.result_else : 0]
    });
  }

  get f() { return this.fixedForumulaFormGroup.controls; }

  ngOnInit() {
    console.log(this.formdata);
    this.initiateESIFormGroup(this.formdata.calculationdetails[0]);
    this.formControlValueChanged();
    this.dropdown = {
      base_dependency: [
        { id: 1, name: 'CTC' },
      ],
      type_dependency: [
        { id: 1, name: '%' },
        { id: 2, name: 'Value' },
      ],
      sub_type_dependency: [
        { id: 1, name: '%' },
        { id: 2, name: 'Value' },
      ],
    };
    if (this.formdata.formula === '2') {
      this.dropdown.base_dependency = [
        { id: 1, name: 'CTC' },
        { id: 2, name: 'Basic' },
      ],
      this.dropdown.type_dependency = [
        { id: 1, name: '<' },
        { id: 2, name: '>' },
        { id: 3, name: '=' },
      ]
    }
  }
  close() {
    this.dialogRef.close();
  }
  onSubmit() {
    if (this.fixedForumulaFormGroup.invalid) {
      return;
    }
    let params = Object.assign({}, this.fixedForumulaFormGroup.value);
    console.log(params);
    if ( this.formdata.formula === '1') {
      params.basevalue = (params.type === '1') ? (params.basevalue / 100).toFixed(2) : params.basevalue;
    }
    params.basetext = this.dropdown.base_dependency.find(x => x.id === parseInt(params.base)).name;
    params.typetext = this.dropdown.type_dependency.find(x => x.id === parseInt(params.type)).name;
    
    if ( this.formdata.formula === '2') {
      params.result_if = (params.result_if_type === '1') ? (params.result_if / 100).toFixed(2) : params.basevalue;
      params.result_else = (params.result_else_type === '1') ? (params.result_else / 100).toFixed(2) : params.result_else;
      params.result_if_type_text = this.dropdown.sub_type_dependency.find(x => x.id === parseInt(params.result_if_type)).name;
      params.result_else_type_text = this.dropdown.sub_type_dependency.find(x => x.id === parseInt(params.result_else_type)).name;
    }
    
    this.dialogRef.close(params);
  }
}
