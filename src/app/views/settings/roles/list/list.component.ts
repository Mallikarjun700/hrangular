import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { CurdcommonserviceService } from '../../../../_services';
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
  constructor(private commonService: CurdcommonserviceService, private route: ActivatedRoute,
    private router: Router, public toastr: ToastrManager) { }
  getList() {
    this.temp = false;
    this.commonService.get('role/get', {})
      .subscribe(
        data => {
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
    this.commonService.post('role/update/' + params.id, params)
      .subscribe(
        details => {
          if (details.success) {
            this.toastr.successToastr('Role saved sucessfully');
            this.getList();
          }
        },
        error => {
          this.toastr.errorToastr(error);
        });
  }

  deleteAction(params: any) {
    this.commonService.get('role/delete/' + params, {}).pipe().subscribe(
      data => {
        if (data.success) {
          this.toastr.successToastr('Role deleted sucessfully');
          this.getList();
        }
      });
  }

}
