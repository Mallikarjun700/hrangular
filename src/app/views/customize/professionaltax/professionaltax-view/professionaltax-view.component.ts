import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-professionaltax-view',
  templateUrl: './professionaltax-view.component.html',
  styleUrls: ['./professionaltax-view.component.scss']
})
export class ProfessionaltaxViewComponent implements OnInit {
  public formdata: any;
  constructor(
    private dialogRef: MatDialogRef<ProfessionaltaxViewComponent>, @Inject(MAT_DIALOG_DATA) data
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
