import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurdcommonserviceService,AuthenticationService } from '../../../../_services';
import { ToastrManager } from 'ng6-toastr-notifications';
import {removeSpaces}  from '../../../../_helpers/customvalidator';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  cityForm: FormGroup;
  dropdown: any;
  id: any;
  constructor(
    private formBuilder: FormBuilder,
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
  ngOnInit() {
    this.dropdown = { country: [], state: [] };
    this.getCountryDependency();
    this.getStateDependency();
    this.cityForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required, removeSpaces]],
      country_id: ['', [Validators.required, removeSpaces]],
      state_id: ['', [Validators.required, removeSpaces]],
    });
    if (this.route.snapshot.params['id']) {
      this.id = this.route.snapshot.params['id'];
      this.commonService.get('city/show/' + this.id, {})
        .subscribe(
          data => {
            setTimeout(() => {this.authenticationService.loaderEnd();}, 10);
            if (data.success) {
              this.cityForm = this.formBuilder.group({
                id: [data.message.id],
                name: [data.message.name, [Validators.required, removeSpaces]],
                country_id: [data.message.country_id, [Validators.required, removeSpaces]],
                state_id: [data.message.state_id, [Validators.required, removeSpaces]],
              });
            }
          });
    }

  }

  get f() { return this.cityForm.controls; }

  onSubmit() {
    console.log(this.f)

    // stop here if form is invalid
    if (this.cityForm.invalid) {
      return;
    }
    let URL = 'city/post';
    if (this.route.snapshot.params['id']) {
      URL = 'city/update/' + this.id
    }
    this.commonService.post(URL, { name: this.f.name.value, country_id: this.f.country_id.value, state_id: this.f.state_id.value })
      .subscribe(
        details => {
          setTimeout(() => {this.authenticationService.loaderEnd();}, 10);
          if (details.success) {
            this.toastr.successToastr('City saved sucessfully');
            this.router.navigate(['/home/settings/city/list']);
          }
        },
        error => {
          setTimeout(() => {this.authenticationService.loaderEnd();}, 10);
          this.toastr.errorToastr(error);
        });
  }
  cancel() {
    this.router.navigate(['/home/settings/city/list']);
  }
}
