import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CurdcommonserviceService,AuthenticationService } from '../../../_services';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { UploadboxComponent } from '../../../_shared/uploadBox/uploadBox.component';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-personalinfo',
  templateUrl: './personalinfo.component.html',
  styleUrls: ['./personalinfo.component.scss']
})
export class PersonalinfoComponent implements OnInit {
  public dataList = [];
  public temp: Object = false;
  dtOptions: DataTables.Settings = {};
  constructor(private commonService: CurdcommonserviceService, 
    private authenticationService: AuthenticationService, 
    private route: ActivatedRoute,
    private router: Router, public toastr: ToastrManager, private matDialog: MatDialog) { }

  getList() {
    this.temp = false;
    this.commonService.get('employee/get', {})
      .subscribe(
        data => {
          setTimeout(() => {this.authenticationService.loaderEnd();}, 10);
          if (data.success) {
            this.dataList = data.message;
            this.dataList.forEach((keyIndex: any, valArray: any) => {
              console.log(this.dataList[valArray]);
              Object.keys(this.dataList[valArray]).forEach((keys: any, vals: any) => {
                const jsonCheck = this.IsJsonString(this.dataList[valArray][keys]);
                if (jsonCheck && keys=='name') {
                  this.dataList[valArray][keys] = (JSON.parse(this.dataList[valArray][keys]));
                }
              });
            });
            console.log(this.dataList);
            this.temp = true;
          }
        });
  }
  IsJsonString(str) {
      try {
          JSON.parse(str);
      } catch (e) {
          return false;
      }
      return true;
  }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    this.getList();
  }
  deleteAction(params: any) {
    this.commonService.get('employee/delete/' + params, {}).subscribe(
      data => {
        setTimeout(() => {this.authenticationService.loaderEnd();}, 10);
        if (data.success) {
          this.toastr.successToastr('Employee deleted sucessfully');
          this.getList();
          console.log(data);
          // this.dataList=data.message;
        }
      });
  }
  openBulkUploadDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '50vw';
    dialogConfig.maxWidth = '50vh';
    dialogConfig.data = {
      limit: 1,
      min: 1,
      max: 20971520,
      // tslint:disable-next-line:max-line-length
      accept: 'application/kset,text/comma-separated-values,application/excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/kset,application/kswps,application/vnd.ms-excel,application/ms-excel,application/vnd.msexcel,application/csv,text/csv,application/msexcel',
      note: 'File format (XLS, XLSX) and File size is maximum 20MB',
      downloadFile: environment.downloadUrl +'storage/app/bulkupload/EmployeeRecords.csv',
      serviceURL: 'employee/bulkimport',
      title: 'Employee',
      redirect: '/home/onboarding/personalinfo',
    };
    this.matDialog.open(UploadboxComponent, dialogConfig);
  }

}
