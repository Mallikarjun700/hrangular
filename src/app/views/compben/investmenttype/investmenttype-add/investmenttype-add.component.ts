import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CurdcommonserviceService, AuthenticationService } from '../../../../_services';
import { ToastrManager } from 'ng6-toastr-notifications';
import {removeSpaces} from '../../../../_helpers/customvalidator';

@Component({
  selector: 'app-investmenttype-add',
  templateUrl: './investmenttype-add.component.html',
  styleUrls: ['./investmenttype-add.component.scss']
})
export class InvestmenttypeAddComponent implements OnInit {
  id: any;
  //public NUMBER = /^(0|[1-9][0-9]*)$/;
  public PERCENTAGE = /(^100(\.0{1,2})?$)|(^([1-9]([0-9])?|0)(\.[0-9]{1,2})?$)/;

  public investtypeFormGroup: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CurdcommonserviceService,
    private authenticationService: AuthenticationService,
    public toastr: ToastrManager) { }

  initiateInvestTypeFormGroup(data?: any) {
    this.investtypeFormGroup = this.formBuilder.group({
      id: [(data) ? data.id : ''],
      name: [(data) ? data.name : '', [Validators.required, removeSpaces]],
      max_amount: [(data) ? data.max_amount : '', [Validators.required, removeSpaces, Validators.pattern(this.PERCENTAGE)]],
      description: [(data) ? data.description : '', [Validators.required, removeSpaces]],
      exemption_limit: [(data) ? data.exemption_limit : '', [Validators.required, removeSpaces]],
      supporting_docs: [(data) ? data.supporting_docs : '', [Validators.required, removeSpaces]],
    });
  }

  ngOnInit() {
    this.initiateInvestTypeFormGroup();
    if (this.route.snapshot.params['id']) {
      this.id = this.route.snapshot.params['id'];
      this.commonService.get('investmenttype/' + this.id, {})
        .subscribe(
          data => {
            setTimeout(() => {this.authenticationService.loaderEnd(); }, 10);
            if (data.success) {
              this.initiateInvestTypeFormGroup(data.message);
            }
          });
    }
  }
  get f() { return this.investtypeFormGroup.controls; }

  onSubmit() {
    if (this.investtypeFormGroup.invalid) {
      return;
    }
    let params = Object.assign({}, this.investtypeFormGroup.value);
    let URL = 'investmenttype/';
    if (this.route.snapshot.params['id']) {
      URL = 'investmenttype/' + this.id;
    }
    Object.keys(params).forEach((keys: any, vals: any) => {
      if (typeof params[keys] !== 'string' && params[keys].length > 0) {
        params[keys] = (JSON.stringify(params[keys]));
      }
    });
    this.commonService.post(URL, params)
      .subscribe(
        details => {
          setTimeout(() => {this.authenticationService.loaderEnd(); }, 10);
          if (details.success) {
            this.toastr.successToastr('Investment Type saved sucessfully');
            this.router.navigate(['/home/compben/investmenttype']);
          } else {
            this.toastr.errorToastr(details.message);
          }
        },
        error => {
          setTimeout(() => {this.authenticationService.loaderEnd(); }, 10);
          const error_array = (JSON.parse(error));
          const keys = Object.keys(error_array);
          keys.forEach(element => {
            this.toastr.errorToastr(error_array[element][0]);
          });
        });
  }

  resetForm(){
    this.investtypeFormGroup.reset();
    this.router.navigate(['/home/compben/investmenttype']);
  }

}
