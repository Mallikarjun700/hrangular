import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { CurdcommonserviceService, AuthenticationService } from './../../../_services';
import { ToastrManager } from 'ng6-toastr-notifications';
import { removeSpaces } from './../../../_helpers/customvalidator';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import { SubComponentComponent } from './sub-component/sub-component.component';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';


const moment = _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-it-declaration',
  templateUrl: './it-declaration.component.html',
  styleUrls: ['./it-declaration.component.scss'],
  providers: [{
    provide: DateAdapter,
    useClass: MomentDateAdapter,
    deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
  },
  { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },]
})
export class ItDeclarationComponent implements OnInit {
  public NUMBER = /^(0|[1-9][0-9]*)$/;
  public itData: any = [];
  id: any;
  public tabData: any = [];
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CurdcommonserviceService,
    private authenticationService: AuthenticationService,
    public toastr: ToastrManager, private matDialog: MatDialog) { }

  ngOnInit() {
    // this.id=this.authenticationService.currentUserValue
    this.tabData = [{ tabid: 1, name: 'Chapter Via Deductions' },
    { tabid: 2, name: 'HRA Monthly Details' },
    { tabid: 3, name: 'Income From Other Sources' },
    { tabid: 4, name: 'Sec 10 Exemption' },
    { tabid: 5, name: 'Second Home Loan Details(Let Out Property)' },
    { tabid: 6, name: 'Self Occupied House / Property' },
    { tabid: 7, name: 'Investments u/s 80C' },
    { tabid: 8, name: '80G' },
    ];
    this.commonService.get('itdeclaration/1', {})
      .subscribe(
        data => {
          setTimeout(() => { this.authenticationService.loaderEnd(); }, 10);
          if (data.success) {
            this.itData = data.message;
            console.log(this.itData);
          }
        });
  }

  addProof(value: any, index: any) {
    this.matDialog.closeAll();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    dialogConfig.data = value;
    dialogConfig.panelClass = 'custom-salarymodalbox';
    const dialogRef = this.matDialog.open(SubComponentComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          console.log(data);

        }
      });

  }
}
