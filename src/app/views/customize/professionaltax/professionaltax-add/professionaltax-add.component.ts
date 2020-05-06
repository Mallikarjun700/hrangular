import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
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
      salary_from: [(data) ? data.salary_from : 0, [Validators.required, removeSpaces]],
      salary_to: [(data) ? data.salary_to : 0, [Validators.required, removeSpaces]],
      slab: [(data) ? data.slab : 1, [Validators.required, removeSpaces]],
      pt_amount: [(data) ? data.pt_amount : 1, [Validators.required, removeSpaces]],
      exemption: [(data) ? data.exemption : 0],
      exemption_age: [(data) ? data.exemption_age : ''],
      exemption_details: [(data) ? data.exemption_details : ''],
      remarks: [(data) ? data.remarks : ''],
      reminder_days: [(data) ? data.reminder_days : ''],
      returns: [(data) ? data.returns : ''],
      document: [(data) ? data.document : '']
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
      console.log(element)
      console.log(element.get('pt_amount'))
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
    } else {
      this.addTaxdetailsValue();
    }
  }

  get f() { return this.professionalTaxFormGroup.controls; }

  onSubmit() {
    let params = Object.assign({},this.professionalTaxFormGroup.value);
    let URL = 'employee/post';
    if (this.route.snapshot.params['id']) {
      URL = 'employee/update/' + this.id;
    }
    console.log(params);
  }

  toggleExemptionStatus(eventchecked: any, params: any) {
    params.status = (eventchecked) ? '1' : '0';
  }
}
