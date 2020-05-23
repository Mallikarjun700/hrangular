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
    const valueControl = this.fixedForumulaFormGroup.get('basevalue');
    this.fixedForumulaFormGroup.get('type').valueChanges.subscribe(
      (mode: string) => {
        console.log(mode);
        console.log(this.formdata.formula);
        if (mode === '1' && this.formdata.formula === '1') {
          valueControl.setValidators([Validators.required, removeSpaces, Validators.pattern(this.PERCENTAGE)]);
        } else {
          valueControl.setValidators([Validators.required, removeSpaces, Validators.pattern(this.NUMBER)]);
        }
        valueControl.updateValueAndValidity();
      });
  }
  initiateESIFormGroup(data?: any) {
    this.fixedForumulaFormGroup = this.formBuilder.group({
      base: [(data) ? data.base : 1, [Validators.required, removeSpaces]],
      type: [(data) ? data.type : 1, [Validators.required, removeSpaces]],
      basevalue: [(data) ? data.basevalue : 1]
    });
  }

  get f() { return this.fixedForumulaFormGroup.controls; }

  ngOnInit() {
    console.log(this.formdata);
    this.initiateESIFormGroup(this.formdata);
    this.formControlValueChanged();
    this.dropdown = {
      base_dependency: [
        { id: 1, name: 'CTC' },
      ],
      type_dependency: [
        { id: 1, name: 'Percentage' },
        { id: 2, name: 'Value' },
      ]
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
    this.dialogRef.close(params);
  }
}
