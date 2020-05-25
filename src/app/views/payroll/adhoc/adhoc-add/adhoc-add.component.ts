import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { CurdcommonserviceService, AuthenticationService } from '../../../../_services';
import { ToastrManager } from 'ng6-toastr-notifications';
import {removeSpaces} from '../../../../_helpers/customvalidator';

@Component({
  selector: 'app-adhoc-add',
  templateUrl: './adhoc-add.component.html',
  styleUrls: ['./adhoc-add.component.scss']
})
export class AdhocAddComponent implements OnInit {

  adhocFormGroup: FormGroup;
  id: any;
  dropdown: any;
  public NUMBER = /^(0|[1-9][0-9]*)$/;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CurdcommonserviceService,
    private authenticationService: AuthenticationService,
    public toastr: ToastrManager) { }

    initiateAdhocFormGroup(data?: any) {
      this.adhocFormGroup = this.formBuilder.group({
        id: [(data) ? data.id : ''],
        adhocdetails: this.formBuilder.array([]),
      });
    }
    createAdhocdetailsFormGroup(data?: any) {
      return this.formBuilder.group({
        component: [(data) ? data.component : '', [Validators.required, removeSpaces]],
        paytype: [(data) ? data.paytype : 1, [Validators.required, removeSpaces]],
        tax_dependent: [(data) ? data.tax_dependent : 1, [Validators.required, removeSpaces]],
        pt_dependent: [(data) ? data.pt_dependent : 1, [Validators.required, removeSpaces]],
        esi_dependent: [(data) ? data.pt_dependent : 1, [Validators.required, removeSpaces]],
        amount: [(data) ? data.amount : '', [Validators.required, removeSpaces, Validators.pattern(this.NUMBER)]],
        type: [(data) ? data.type : 1]
      });
    }
    get adhocdetails(): FormArray {
      return this.adhocFormGroup.get('adhocdetails') as FormArray;
    }
    addAdhocdetailsValue(data?: any) {
      let invalidCount = 0;
      this.adhocdetails.controls.forEach(element => {
        if (element.invalid && element.get('type').errors) {
          invalidCount++;
        }
      });
      if (invalidCount == 0) {
        let fg = this.createAdhocdetailsFormGroup(data);
        this.adhocdetails.push(fg);
      }
    }
    deleteAdhocdetailsValue(idx: number) {
      this.adhocdetails.removeAt(idx);
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

    this.dropdown = {
      paytype_dependent: [
        { id: 1, name: 'Earning' },
        { id: 2, name: 'Deduction' },
      ],
      yesno_dependent_include_not: [
        { id: 1, name: 'Yes' },
        { id: 2, name: 'No' },
        { id: 3, name: 'Not Applicable' },
      ],
      default_adhoc_salary_dependent: [
        { component: 'Other Earnings', paytype: 1, type: 0 },
        { component: 'Other Earnings (Non Taxable)', paytype: 1, type: 0 },
        { component: 'Other Deductions', paytype: 2, type: 0 },
        { component: 'Incentive', paytype: 2, type: 0 },
        { component: 'Salary Advance', paytype: 1, type: 0 },
        { component: 'Salary Advance Recovery', paytype: 2, type: 0 },
      ],
    };
    this.initiateAdhocFormGroup();
    if (this.route.snapshot.params['id']) {
      this.id = this.route.snapshot.params['id'];
      this.commonService.get('adhoc/' + this.id, {})
        .subscribe(
          data => {
            setTimeout(() => {this.authenticationService.loaderEnd(); }, 10);
            if (data.success) {
              Object.keys(data.message).forEach((keys: any, vals: any) => {
                const jsonCheck = this.IsJsonString(data.message[keys]);
                if (jsonCheck) {
                  data.message[keys] = (JSON.parse(data.message[keys]));
                }
              });
              this.initiateAdhocFormGroup(data.message);
              data.message.adhocdetails.forEach(element => {
                this.addAdhocdetailsValue(element);
              });
            }
          });
    } else {
      this.dropdown.default_adhoc_salary_dependent.forEach(element => {
        this.addAdhocdetailsValue(element);
      });
    }
    
  }

  get f() { return this.adhocFormGroup.controls; }

  onSubmit() {
    if (this.adhocFormGroup.invalid) {
      return;
    }
    let params = Object.assign({}, this.adhocFormGroup.value);
    let URL = 'adhoc';
    if (this.route.snapshot.params['id']) {
      URL = 'adhoc/' + this.id;
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
            this.toastr.successToastr('Adhoc saved sucessfully');
            this.router.navigate(['/home/payroll/adhoc']);
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

  cancel() {
    this.router.navigate(['/home/payroll/adhoc']);
  }
}
