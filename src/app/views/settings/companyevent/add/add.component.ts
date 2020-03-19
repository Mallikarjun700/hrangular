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
  companyeventForm: FormGroup;
  dropdown: any;
  id: any;
  iconData: any;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CurdcommonserviceService,
    private authenticationService: AuthenticationService,
    public toastr: ToastrManager) { }

  getCompanyProfileDependency() {
    this.commonService.get('companyprofile/get', {})
      .subscribe(
        data => {
          setTimeout(() => {this.authenticationService.loaderEnd();}, 10);
          if (data.success) {
            this.dropdown.company_profiles = data.message;
          }
        });
  }


  iconChanged(event: any) {
    this.iconData = event.target.value;
  }


  ngOnInit() {
    this.dropdown = { company_profiles: [] };
    this.getCompanyProfileDependency();
    this.companyeventForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required, removeSpaces]],
      icon: ['', [Validators.required, removeSpaces]],
      color: ['', [Validators.required, removeSpaces]],
      company_id: ['', [Validators.required, removeSpaces]],
    });
    if (this.route.snapshot.params['id']) {
      this.id = this.route.snapshot.params['id'];
      this.commonService.get('companyevent/show/' + this.id, {})
        .subscribe(
          data => {
            setTimeout(() => {this.authenticationService.loaderEnd();}, 10);
            if (data.success) {
              this.companyeventForm = this.formBuilder.group({
                id: [data.message.id],
                name: [data.message.name, [Validators.required, removeSpaces]],
                icon: [data.message.icon, [Validators.required, removeSpaces]],
                color: [data.message.color, [Validators.required, removeSpaces]],
                company_id: [data.message.company_id, [Validators.required, removeSpaces]],
              });
            }
          });
    }

  }

  get f() { return this.companyeventForm.controls; }

  onSubmit() {
    console.log(this.f)

    // stop here if form is invalid
    if (this.companyeventForm.invalid) {
      return;
    }
    let URL = 'companyevent/post';
    if (this.route.snapshot.params['id']) {
      URL = 'companyevent/update/' + this.id
    }
    this.commonService.post(URL, { name: this.f.name.value, company_id: this.f.company_id.value, icon: this.f.icon.value, color: this.f.color.value })
      .subscribe(
        details => {
          setTimeout(() => {this.authenticationService.loaderEnd();}, 10);
          if (details.success) {
            this.toastr.successToastr('Company Event saved sucessfully');
            this.router.navigate(['/home/settings/companyevent/list']);
          }
        },
        error => {
          setTimeout(() => {this.authenticationService.loaderEnd();}, 10);
          this.toastr.errorToastr(error);
        });
  }
  cancel() {
    this.router.navigate(['/home/settings/companyevent/list']);
  }
}
