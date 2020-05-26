import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CurdcommonserviceService, AuthenticationService } from '../../../../_services';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';


@Component({
  selector: 'app-salary-structure-list',
  templateUrl: './salary-structure-list.component.html',
  styleUrls: ['./salary-structure-list.component.scss']
})
export class SalaryStructureListComponent implements OnInit {
  public dataList = [];
  public temp: Object = false;
  dtOptions: DataTables.Settings = {};
  constructor(
    private commonService: CurdcommonserviceService, 
    private authenticationService: AuthenticationService, 
    private route: ActivatedRoute,
    private router: Router, public toastr: ToastrManager, 
    private matDialog: MatDialog) { }

  getList() {
    this.temp = false;
    this.dataList = [];
    this.commonService.get('salarystructure', {})
      .subscribe(
        data => {
          setTimeout(() => { this.authenticationService.loaderEnd(); }, 10);
          if (data.success) {
            this.dataList = data.message;
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
    this.commonService.get('salarystructure/delete/' + params, {}).subscribe(
      data => {
        setTimeout(() => { this.authenticationService.loaderEnd(); }, 10);
        if (data.success) {
          this.toastr.successToastr('Salary Structure deleted sucessfully');
          this.getList();
        }
      });
  }
  toggleStatus(eventchecked: any, params: any) {
    params.status = (eventchecked) ? '1' : '0';
    this.commonService.post('salarystructure/' + params.id, params)
      .subscribe(
        details => {
          setTimeout(() => { this.authenticationService.loaderEnd(); }, 10);
          if (details.success) {
            this.toastr.successToastr('Salary Structure status changed sucessfully');
            this.getList();
          }
        },
        error => {
          setTimeout(() => { this.authenticationService.loaderEnd(); }, 10);
          this.toastr.errorToastr(error);
        });
  }
}
