import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ValidatorFn } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CurdcommonserviceService, AuthenticationService } from '../../../../_services';
import { ToastrManager } from 'ng6-toastr-notifications';
import {removeSpaces} from '../../../../_helpers/customvalidator';

@Component({
  selector: 'app-professionaltax-add',
  templateUrl: './professionaltax-add.component.html',
  styleUrls: ['./professionaltax-add.component.scss']
})
export class ProfessionaltaxAddComponent implements OnInit {
  dropdown: any;
  dropdownmain: any;
  id: any;
  public NUMBER = /^(0|[1-9][0-9]*)$/;
  public professionalTaxFormGroup: FormGroup;

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
          setTimeout(() => {this.authenticationService.loaderEnd();}, 10);
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
          setTimeout(() => {this.authenticationService.loaderEnd();}, 10);
          if (data.success) {
            this.dropdown.state = data.message;
          }
        });
  }

  createTaxdetailsFormGroup(data?: any) {
    return this.formBuilder.group({
      salary_range: [(data) ? data.salary_range : 1, [Validators.required, removeSpaces]],
      salary_from: [(data) ? data.salary_from : '', [Validators.required, removeSpaces, Validators.pattern(this.NUMBER)]],
      salary_to: [(data) ? data.salary_to : '', [Validators.required, removeSpaces, Validators.pattern(this.NUMBER)]],
      slab: [(data) ? data.slab : '', [Validators.required, removeSpaces]],
      pt_amount: [(data) ? data.pt_amount : '', [Validators.required, removeSpaces, Validators.pattern(this.NUMBER)]],
      exemption: [(data) ? data.exemption : 0],
      exemption_age: [(data) ? data.exemption_age : '', Validators.pattern(this.NUMBER)],
      exemption_details: [(data) ? data.exemption_details : ''],
      remarks: [(data) ? data.remarks : ''],
      reminder_days: [(data) ? data.reminder_days : ''],
      returns: [(data) ? data.returns : ''],
      document_name: [(data) ? data.document_name : '']
    });
  }
  
  initiateProfessionalTaxFormGroup(data?: any) {
    this.professionalTaxFormGroup = this.formBuilder.group({
      id: [(data) ? data.id : ''],
      country_id: [(data) ? data.country_id : '', [Validators.required, removeSpaces]],
      state_id: [(data) ? data.state_id : '', [Validators.required, removeSpaces]],
      taxdetails: this.formBuilder.array([]),
    });
  }

  get taxdetails(): FormArray {
    return this.professionalTaxFormGroup.get('taxdetails') as FormArray;
  }
  addTaxdetailsValue(data?: any) {
    let invalidCount = 0;
    if (this.taxdetails.invalid) {
      invalidCount++;
    }
    this.taxdetails.controls.forEach(element => {
      if (element.invalid && element.get('pt_amount').errors) {
        invalidCount++;
      }
    });
    if (invalidCount == 0) {
      let fg = this.createTaxdetailsFormGroup(data);
      this.taxdetails.push(fg);
    }
  }
  deleteTaxdetailsValue(idx: number) {
    this.taxdetails.removeAt(idx);
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
    this.initiateProfessionalTaxFormGroup();
    if (this.route.snapshot.params['id']) {
      this.id = this.route.snapshot.params['id'];
      this.commonService.get('professionaltax/show/' + this.id, {})
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
              this.initiateProfessionalTaxFormGroup(data.message);
              data.message.taxdetails.forEach(element => {
                this.addTaxdetailsValue(element);
              });
            }
          });
    } else {
      this.addTaxdetailsValue();
    }
  }

  get f() { return this.professionalTaxFormGroup.controls; }

  onSubmit() {
    if (this.professionalTaxFormGroup.invalid) {
      return;
    }
    let params = Object.assign({},this.professionalTaxFormGroup.value);
    let URL = 'professionaltax/post';
    if (this.route.snapshot.params['id']) {
      URL = 'professionaltax/update/' + this.id;
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
            this.toastr.successToastr('Professional tax saved sucessfully');
            this.router.navigate(['/home/customize/professionaltax']);
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

  toggleExemptionStatus(eventchecked: any, params: any) {
    params.status = (eventchecked) ? '1' : '0';
  }
  resetForm(){
    this.professionalTaxFormGroup.reset();
    this.router.navigate(['/home/customize/professionaltax']);
  }
}
