import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { removeSpaces } from './../../../../_helpers';

@Component({
  selector: 'app-sub-component',
  templateUrl: './sub-component.component.html',
  styleUrls: ['./sub-component.component.scss']
})
export class SubComponentComponent implements OnInit {
  public formdata: any;
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<SubComponentComponent>, @Inject(MAT_DIALOG_DATA) data
  ) {
    this.formdata = data;
  }

  ngOnInit() {
    console.log(this.formdata);
  }
  close() {
    this.dialogRef.close();
  }
}
