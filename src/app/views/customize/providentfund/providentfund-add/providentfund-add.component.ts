import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CurdcommonserviceService, AuthenticationService } from '../../../../_services';
import { ToastrManager } from 'ng6-toastr-notifications';
import {removeSpaces} from '../../../../_helpers/customvalidator';

@Component({
  selector: 'app-providentfund-add',
  templateUrl: './providentfund-add.component.html',
  styleUrls: ['./providentfund-add.component.scss']
})
export class ProvidentfundAddComponent implements OnInit {
  dropdown: any;
  dropdownmain: any;
  id: any;
  public NUMBER = /^(0|[1-9][0-9]*)$/;
  public providentFundFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CurdcommonserviceService,
    private authenticationService: AuthenticationService,
    public toastr: ToastrManager) { }
  
    createPFdetailsFormGroup(data?: any) {
      return this.formBuilder.group({
        account_id: [(data) ? data.account_id : '', [Validators.required, removeSpaces]],
        account_name: [(data) ? data.account_name : '', [Validators.required, removeSpaces]],
        salary_type: [(data) ? data.salary_type : [Validators.required]],
        salary_per: [(data) ? data.salary_per : 0, [Validators.required, removeSpaces, Validators.pattern(this.NUMBER)]],
        account_details: [(data) ? data.account_details : ''],
      });
    }
  
    initiateProvidentFundFormGroup(data?: any) {
      this.providentFundFormGroup = this.formBuilder.group({
        id: [(data) ? data.id : ''],
        pfstatus: [(data) ? data.pfstatus : 0],
        amount: [(data) ? data.amount : '', [Validators.required, removeSpaces]],
        effective_date: [(data) ? data.effective_date : ''],
        vc_allowed: [(data) ? data.vc_allowed : 0],
        stop_age: [(data) ? data.stop_age : '', [Validators.required, removeSpaces]],
        age_desc: [(data) ? data.age_desc : ''],
        pfdetails: this.formBuilder.array([]),
      });
    }
  
    get pfdetails(): FormArray {
      return this.providentFundFormGroup.get('pfdetails') as FormArray;
    }
    addPFdetailsValue(data?: any) {
      let invalidCount = 0;
      if (this.pfdetails.invalid) {
        invalidCount++;
      }
      this.pfdetails.controls.forEach(element => {
        if (element.invalid && element.get('account_id').errors) {
          invalidCount++;
        }
      });
      if (invalidCount == 0) {
        let fg = this.createPFdetailsFormGroup(data);
        this.pfdetails.push(fg);
      }
    }
    deletePFdetailsValue(idx: number) {
      this.pfdetails.removeAt(idx);
    }
  
    IsJsonString(str) {
      try {
          JSON.parse(str);
      } catch (e) {
          return false;
      }
      return true;
    }
  ngOnInit() {
    this.initiateProvidentFundFormGroup();
    if (this.route.snapshot.params['id']) {
      this.id = this.route.snapshot.params['id'];
      this.commonService.get('providentfund/show/' + this.id, {})
        .subscribe(
          data => {
            setTimeout(() => {this.authenticationService.loaderEnd();}, 10);
            if (data.success) {
              console.log(data.message);
              Object.keys(data.message).forEach((keys: any, vals: any) => {
                const jsonCheck = this.IsJsonString(data.message[keys])
                if (jsonCheck) {
                  data.message[keys] = (JSON.parse(data.message[keys]));
                }
              });
              this.initiateProvidentFundFormGroup(data.message);
              data.message.pfdetails.forEach(element => {
                this.addPFdetailsValue(element);
              });
            }
          });
    }else{
      this.addPFdetailsValue();
    }
  }
  get f() { return this.providentFundFormGroup.controls; }

  onSubmit() {
    if (this.providentFundFormGroup.invalid) {
      return;
    }
    let params = Object.assign({},this.providentFundFormGroup.value);
    let URL = 'providentfund/post';
    if (this.route.snapshot.params['id']) {
      URL = 'providentfund/update/' + this.id;
    }
    Object.keys(params).forEach((keys: any, vals: any) => {
      if(typeof params[keys] !== 'string' && params[keys].length > 0){
        params[keys] = (JSON.stringify(params[keys]));
      }
    });
    console.log(params);
    this.commonService.post(URL, params)
      .subscribe(
        details => {
          setTimeout(() => {this.authenticationService.loaderEnd();}, 10);
          if (details.success) {
            this.toastr.successToastr('Provident Fund saved sucessfully');
            this.router.navigate(['/home/customize/providentfund']);
          } else {
            this.toastr.errorToastr(details.message);
          }
        },
        error => {
          setTimeout(() => {this.authenticationService.loaderEnd();}, 10);
          const error_array = (JSON.parse(error));
          const keys = Object.keys(error_array);
          keys.forEach(element => {
            this.toastr.errorToastr(error_array[element][0]);
          });
        });
  }

  resetForm(){
    this.providentFundFormGroup.reset();
    this.router.navigate(['/home/customize/providentfund']);
  }
}
