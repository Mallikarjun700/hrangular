import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-lwf-view',
  templateUrl: './lwf-view.component.html',
  styleUrls: ['./lwf-view.component.scss']
})
export class LwfViewComponent implements OnInit {
  public formdata: any;
  constructor(
    private dialogRef: MatDialogRef<LwfViewComponent>, @Inject(MAT_DIALOG_DATA) data
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
