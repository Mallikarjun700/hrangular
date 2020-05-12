import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CurdcommonserviceService, AuthenticationService } from '../../../../_services';
import { ToastrManager } from 'ng6-toastr-notifications';
import {removeSpaces} from '../../../../_helpers/customvalidator';

@Component({
  selector: 'app-lwf-add',
  templateUrl: './lwf-add.component.html',
  styleUrls: ['./lwf-add.component.scss']
})
export class LwfAddComponent implements OnInit {
  dropdown: any;
  dropdownmain: any;
  id: any;
  public NUMBER = /^(0|[1-9][0-9]*)$/;
  public lwfFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CurdcommonserviceService,
    private authenticationService: AuthenticationService,
    public toastr: ToastrManager) { }

  getCountryDependency() {
    this.commonService.get('country/get', {})
      .subscribe(
        data => {
          setTimeout(() => {this.authenticationService.loaderEnd(); }, 10);
          if (data.success) {
            this.dropdown.country = data.message;
          }
        });
  }

  getStateDependency(countryId?: any) {
    let URL_GET = 'state/get';
    if ((countryId)){
      URL_GET = 'state/country/' + countryId;
    }
    this.commonService.get(URL_GET, {})
      .subscribe(
        data => {
          setTimeout(() => {this.authenticationService.loaderEnd(); }, 10);
          if (data.success) {
            this.dropdown.state = data.message;
          }
        });
  }

  createLWFDetailsFormGroup(data?: any) {
    return this.formBuilder.group({
      applicability: [(data) ? data.salary_range : 1, [Validators.required, removeSpaces]],
      category: [(data) ? data.category : ''],
      employee_contribution: [(data) ? data.employee_contribution : 0,
        [Validators.required, removeSpaces, Validators.pattern(this.NUMBER)]],
      employer_contribution: [(data) ? data.employer_contribution : 0,
        [Validators.required, removeSpaces, Validators.pattern(this.NUMBER)]],
      total_contribution: [(data) ? data.total_contribution : 0,
        [Validators.required, removeSpaces, Validators.pattern(this.NUMBER)]],
      dod: [(data) ? data.dod : '', [Validators.required]],
      last_dod: [(data) ? data.last_dod : '', [Validators.required]],
      document_name: [(data) ? data.document_name : ''],
      frequency: [(data) ? data.frequency : ''],
    });
  }

  initiateLWFFormGroup(data?: any) {
    this.lwfFormGroup = this.formBuilder.group({
      id: [(data) ? data.id : ''],
      country_id: [(data) ? data.country_id : '', [Validators.required, removeSpaces]],
      state_id: [(data) ? data.state_id : '', [Validators.required, removeSpaces]],
      lwfdetails: this.formBuilder.array([]),
    });
  }

  get lwfdetails(): FormArray {
    return this.lwfFormGroup.get('lwfdetails') as FormArray;
  }
  addLWFDetailsValue(data?: any) {
    let invalidCount = 0;
    if (this.lwfdetails.invalid) {
      invalidCount++;
    }
    this.lwfdetails.controls.forEach(element => {
      if (element.invalid && element.get('applicability').errors) {
        invalidCount++;
      }
    });
    if (invalidCount == 0) {
      let fg = this.createLWFDetailsFormGroup(data);
      this.lwfdetails.push(fg);
    }
  }
  deleteLWFDetailsValue(idx: number) {
    this.lwfdetails.removeAt(idx);
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
    this.dropdown = { country: [], state: []};
    this.getCountryDependency();
    this.getStateDependency();
    this.initiateLWFFormGroup();
    if (this.route.snapshot.params['id']) {
      this.id = this.route.snapshot.params['id'];
      this.commonService.get('lwf/show/' + this.id, {})
        .subscribe(
          data => {
            setTimeout(() => {this.authenticationService.loaderEnd(); }, 10);
            if (data.success) {
              console.log(data.message);
              Object.keys(data.message).forEach((keys: any, vals: any) => {
                const jsonCheck = this.IsJsonString(data.message[keys])
                if (jsonCheck) {
                  data.message[keys] = (JSON.parse(data.message[keys]));
                }
              });
              this.initiateLWFFormGroup(data.message);
              data.message.details.forEach(element => {
                this.addLWFDetailsValue(element);
              });
            }
          });
    } else {
      this.addLWFDetailsValue();
    }
  }

  get f() { return this.lwfFormGroup.controls; }

  totalContributionCalc(index: any) {
    const ctrl = this.lwfFormGroup.get('lwfdetails') as FormArray;
    // tslint:disable-next-line: max-line-length
    let total_contribution = parseFloat(this.lwfdetails.controls[index].value.employee_contribution) + parseFloat(this.lwfdetails.controls[index].value.employer_contribution);
    ctrl.at(index).patchValue({ total_contribution: (total_contribution) });
  }

  onSubmit() {
    if (this.lwfFormGroup.invalid) {
      return;
    }
    let params = Object.assign({}, this.lwfFormGroup.value);
    let URL = 'lwf/post';
    if (this.route.snapshot.params['id']) {
      URL = 'lwf/update/' + this.id;
    }
    Object.keys(params).forEach((keys: any, vals: any) => {
      if (typeof params[keys] !== 'string' && params[keys].length > 0){
        params[keys] = (JSON.stringify(params[keys]));
      }
    });
    console.log(params);
    this.commonService.post(URL, params)
      .subscribe(
        details => {
          setTimeout(() => {this.authenticationService.loaderEnd(); }, 10);
          if (details.success) {
            this.toastr.successToastr('LWF saved sucessfully');
            this.router.navigate(['/home/customize/lwf']);
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

  toggleExemptionStatus(eventchecked: any, params: any) {
    params.status = (eventchecked) ? '1' : '0';
  }
  resetForm(){
    this.lwfFormGroup.reset();
    this.router.navigate(['/home/customize/lwf']);
  }
}
