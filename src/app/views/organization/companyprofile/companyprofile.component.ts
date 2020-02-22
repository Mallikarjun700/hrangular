import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CurdcommonserviceService } from '../../../_services';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-companyprofile',
  templateUrl: './companyprofile.component.html',
  styleUrls: ['./companyprofile.component.css']
})
export class CompanyprofileComponent implements OnInit {
  public dataList = [];
  public temp: Object = false;
  dtOptions: DataTables.Settings = {};
  constructor(private commonService: CurdcommonserviceService, private route: ActivatedRoute,
    private router: Router, public toastr: ToastrManager) { }

  getList() {
    this.temp = false;
    this.commonService.get('companyprofile/get', {})
      .subscribe(
        data => {
          if (data.success) {
            this.dataList = data.message;
            this.temp = true;
          }
        });
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
    this.commonService.get('companyprofile/delete/' + params, {}).subscribe(
      data => {
        if (data.success) {
          this.toastr.successToastr('Company deleted sucessfully');
          this.getList();
          console.log(data);
          // this.dataList=data.message;
        }
      });
  }
}
