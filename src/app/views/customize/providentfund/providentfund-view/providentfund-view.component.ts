import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-providentfund-view',
  templateUrl: './providentfund-view.component.html',
  styleUrls: ['./providentfund-view.component.scss']
})
export class ProvidentfundViewComponent implements OnInit {

  public formdata: any;
  constructor(
    private dialogRef: MatDialogRef<ProvidentfundViewComponent>, @Inject(MAT_DIALOG_DATA) data
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
