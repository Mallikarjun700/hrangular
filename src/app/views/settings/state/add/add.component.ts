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
  stateForm: FormGroup;
  dropdown:any;
  id: any;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CurdcommonserviceService,
    private authenticationService: AuthenticationService,
    public toastr: ToastrManager) { }

  getCountryDependency(){
    this.commonService.get('country/get', {})
      .subscribe(
        data => {
          setTimeout(() => {this.authenticationService.loaderEnd();}, 10);
          if (data.success) {
            this.dropdown.country = data.message;
          }
        });
  }

  ngOnInit() {
    this.dropdown={country:[]};
    this.getCountryDependency();
    this.stateForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required, removeSpaces]],
      country_id: ['', [Validators.required, removeSpaces]],
    });
    if (this.route.snapshot.params['id']) {
      this.id = this.route.snapshot.params['id'];
      this.commonService.get('state/show/' + this.id, {})
        .subscribe(
          data => {
            if (data.success) {
              setTimeout(() => {this.authenticationService.loaderEnd();}, 10);
              this.stateForm = this.formBuilder.group({
                id: [data.message.id],
                name: [data.message.name, [Validators.required, removeSpaces]],
                country_id: [data.message.country_id, [Validators.required, removeSpaces]],
              });
            }
          });
    }

  }
  
  get f() { return this.stateForm.controls; }

  onSubmit() {
    console.log(this.f)

    // stop here if form is invalid
    if (this.stateForm.invalid) {
      return;
    }
    let URL = 'state/post';
    if (this.route.snapshot.params['id']) {
      URL = 'state/update/' + this.id
    }
    this.commonService.post(URL, { name: this.f.name.value,country_id:this.f.country_id.value })
      .subscribe(
        details => {
          setTimeout(() => {this.authenticationService.loaderEnd();}, 10);
          if (details.success) {
            this.toastr.successToastr('State saved sucessfully');
            this.router.navigate(['/home/settings/state/list']);
          }
        },
        error => {
          setTimeout(() => {this.authenticationService.loaderEnd();}, 10);
          this.toastr.errorToastr(error);
        });
  }
  cancel() {
    this.router.navigate(['/home/settings/state/list']);
  }
}
