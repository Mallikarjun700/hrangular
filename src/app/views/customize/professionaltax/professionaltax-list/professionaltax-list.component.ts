import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CurdcommonserviceService, AuthenticationService } from '../../../../_services';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-professionaltax-list',
  templateUrl: './professionaltax-list.component.html',
  styleUrls: ['./professionaltax-list.component.scss']
})
export class ProfessionaltaxListComponent implements OnInit {
  public dataList = [];
  public temp: Object = false;
  dtOptions: DataTables.Settings = {};
  constructor(private commonService: CurdcommonserviceService, private authenticationService: AuthenticationService, private route: ActivatedRoute,
    private router: Router, public toastr: ToastrManager) { }

  getList() {
    this.temp = false;
    // this.commonService.get('employee/get', {})
    //   .subscribe(
    //     data => {
    //       setTimeout(() => { this.authenticationService.loaderEnd(); }, 10);
    //       if (data.success) {
    //         this.dataList = data.message;
    //         this.dataList.forEach((keyIndex: any, valArray: any) => {
    //           console.log(this.dataList[valArray]);
    //           Object.keys(this.dataList[valArray]).forEach((keys: any, vals: any) => {
    //             const jsonCheck = this.IsJsonString(this.dataList[valArray][keys]);
    //             if (jsonCheck && keys === 'name') {
    //               this.dataList[valArray][keys] = (JSON.parse(this.dataList[valArray][keys]));
    //             }
    //           });
    //         });
    //         console.log(this.dataList);
    //         this.temp = true;
    //       }
    //     });
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
    // this.commonService.get('employee/delete/' + params, {}).subscribe(
    //   data => {
    //     setTimeout(() => { this.authenticationService.loaderEnd(); }, 10);
    //     if (data.success) {
    //       this.toastr.successToastr('Employee deleted sucessfully');
    //       this.getList();
    //       console.log(data);
    //       // this.dataList=data.message;
    //     }
    //   });
  }

}
