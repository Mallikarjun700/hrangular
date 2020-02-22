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
    this.commonService.get('city/get', {})
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
  getStateList() {
    this.commonService.get('state/get', {})
      .subscribe(
        data => {
          if (data.success) {
            this.getStateList = data.message;
          }
        });
  }
  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    this.getCountryList();
    this.getStateList();
    this.getList();
  }
  deleteAction(params: any) {
    this.commonService.get('city/delete/' + params, {}).subscribe(
      data => {
        if (data.success) {
          this.toastr.successToastr('City deleted sucessfully');
          this.getCountryList();
          this.getStateList();
          this.getList();
        }
      });
  }
}
