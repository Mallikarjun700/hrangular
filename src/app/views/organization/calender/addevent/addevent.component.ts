import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-addevent',
  templateUrl: './addevent.component.html',
  styleUrls: ['./addevent.component.scss']
})
export class AddeventComponent {
  public firstFormGroup: FormGroup;
  initiateFirstFormGroup(data?: any) {
    this.firstFormGroup = this._formBuilder.group({
      id: [(data) ? data.id : ''],
      name: [(data) ? data.name : '', Validators.required],
      date: [(data) ? data.date : '', Validators.required]
    });
  }
  constructor(
    public dialogRef: MatDialogRef<AddeventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder) {
    console.log(data);
    this.initiateFirstFormGroup(data);
  }

  get f1() { return this.firstFormGroup.controls; }

  onSubmit() {
    if (this.firstFormGroup.invalid) {
      return;
    }
    let params = Object.assign({}, this.firstFormGroup.value);
    console.log(params);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
