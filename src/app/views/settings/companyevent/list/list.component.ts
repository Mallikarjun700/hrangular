import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CurdcommonserviceService,AuthenticationService } from '../../../../_services';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public dataList = [];
  public temp: Object = false;
  dtOptions: DataTables.Settings = {};
  constructor(private commonService: CurdcommonserviceService,private authenticationService: AuthenticationService, private route: ActivatedRoute,
    private router: Router, public toastr: ToastrManager) { }
  getList() {
    this.temp = false;
    this.commonService.get('companyevent/get', {})
      .subscribe(
        data => {
          setTimeout(() => {this.authenticationService.loaderEnd();}, 10);
          if (data.success) {
            this.dataList = data.message;
            this.temp = true;
          }
        });
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    this.getList();
  }

  toggleStatus(eventchecked: any, params: any) {
    params.status = (eventchecked) ? '1' : '0';
    this.commonService.post('companyevent/update/' + params.id, params)
      .subscribe(
        details => {
          setTimeout(() => {this.authenticationService.loaderEnd();}, 10);
          if (details.success) {
            this.toastr.successToastr('Comapny Event saved sucessfully');
            this.getList();
          }
        },
        error => {
          setTimeout(() => {this.authenticationService.loaderEnd();}, 10);
          this.toastr.errorToastr(error);
        });
  }

  deleteAction(params: any) {
    this.commonService.get('companyevent/delete/' + params, {}).pipe().subscribe(
      data => {
        setTimeout(() => {this.authenticationService.loaderEnd();}, 10);
        if (data.success) {
          this.toastr.successToastr('Comapny Event deleted sucessfully');
          this.getList();
        }
      });
  }
}
