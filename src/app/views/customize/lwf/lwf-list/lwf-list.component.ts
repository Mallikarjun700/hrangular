import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CurdcommonserviceService, AuthenticationService } from '../../../../_services';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LwfViewComponent } from '../lwf-view/lwf-view.component';
@Component({
  selector: 'app-lwf-list',
  templateUrl: './lwf-list.component.html',
  styleUrls: ['./lwf-list.component.scss']
})
export class LwfListComponent implements OnInit {
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
    this.commonService.get('lwf/get', {})
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

  openDialog(details: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '400px';
    dialogConfig.width = '1000px';
    this.commonService.get('lwf/show/' + details.id, {})
      .subscribe(
        data => {
          setTimeout(() => { this.authenticationService.loaderEnd(); }, 10);
          if (data.success) {
            Object.keys(data.message).forEach((keys: any, vals: any) => {
              const jsonCheck = this.IsJsonString(data.message[keys])
              if (jsonCheck) {
                data.message[keys] = (JSON.parse(data.message[keys]));
              }
            });
            setTimeout(() => {
              dialogConfig.data = data.message;
              dialogConfig.data.country_name = details.country_name;
              dialogConfig.data.state_name = details.state_name;
              this.matDialog.open(LwfViewComponent, dialogConfig); }, 100);
          }
        });
  }
  deleteAction(params: any) {
    this.commonService.get('lwf/delete/' + params, {}).subscribe(
      data => {
        setTimeout(() => { this.authenticationService.loaderEnd(); }, 10);
        if (data.success) {
          this.toastr.successToastr('LWF deleted sucessfully');
          this.getList();
          // this.dataList=data.message;
        }
      });
  }
  toggleStatus(eventchecked: any, params: any) {
    params.status = (eventchecked) ? '1' : '0';
    this.commonService.post('lwf/update/' + params.id, params)
      .subscribe(
        details => {
          setTimeout(() => { this.authenticationService.loaderEnd(); }, 10);
          if (details.success) {
            this.toastr.successToastr('LWF status changed sucessfully');
            this.getList();
          }
        },
        error => {
          setTimeout(() => { this.authenticationService.loaderEnd(); }, 10);
          this.toastr.errorToastr(error);
        });
  }
}
