<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
    this.commonService.get('state/get', {})
      .subscribe(
        data => {
          if (data.success) {
            this.dataList = data.message;
            this.temp = true;
          }
        });
  }
  getCountryList() {
    this.commonService.get('country/get', {})
      .subscribe(
        data => {
          if (data.success) {
            this.getCountryList = data.message;
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
    this.getCountryList();
  }
  deleteAction(params: any) {
    this.commonService.get('state/delete/' + params, {}).pipe().subscribe(
      data => {
        if (data.success) {
          this.toastr.successToastr('State deleted sucessfully');
          this.getList();
          this.getCountryList();
        }
      });
  }
}
=======
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
    this.commonService.get('state/get', {})
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
    this.commonService.post('state/update/' + params.id, params)
      .subscribe(
        details => {
          if (details.success) {
            this.toastr.successToastr('State saved sucessfully');
            this.getList();
          }
        },
        error => {
          this.toastr.errorToastr(error);
        });
  }

  deleteAction(params: any) {
    this.commonService.get('state/delete/' + params, {}).pipe().subscribe(
      data => {
        if (data.success) {
          this.toastr.successToastr('State deleted sucessfully');
          this.getList();
          console.log(data);
          // this.dataList=data.message;
        }
      });
  }
}
>>>>>>> 6a282023f392bfcb16360beac6c4bf6905f93819
