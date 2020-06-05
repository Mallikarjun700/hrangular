import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../_services';
import { ToastrManager } from 'ng6-toastr-notifications';
import {removeSpaces}  from '../../_helpers/customvalidator';
@Component({
  selector: 'app-dashboard',
  templateUrl: 'forget.component.html'
})
export class ForgetComponent implements OnInit {
  public EMAIL_REGEX = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
  forgetForm: FormGroup;
  loading = false;
  mailExist = false;
  submitted = false;
  error: any;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    public toastr: ToastrManager
) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
        this.router.navigate(['/home/dashboard']);
    }
}

ngOnInit() {
    this.forgetForm = this.formBuilder.group({
        email: ['', [Validators.required, removeSpaces, Validators.pattern(this.EMAIL_REGEX)]],
    });
}
// convenience getter for easy access to form fields
get f() { return this.forgetForm.controls; }

checkExist(){
  this.mailExist = false;
  if (this.f.email.invalid) {
      return;
  }
  this.loading = true;
  this.authenticationService.registerMailCheck(this.f.email.value)
    .pipe(first())
    .subscribe(
      data => {
        if (data.success) {
          this.mailExist = true;
          this.loading = false;
        }
      },
      error => {
        this.loading = false;
        this.toastr.errorToastr(error);
      });
}

onSubmit(){
  this.submitted = true;
  if (this.forgetForm.invalid) {
      return;
  }
  this.authenticationService.forgetPasswordMailCheck(this.f.email.value)
    .pipe(first())
    .subscribe(
      data => {
        if (data.success) {
          this.toastr.successToastr(data.message);
          this.router.navigate(['/login']);
        } else {
          this.toastr.errorToastr(data.message);
        }
      },
      error => {
        this.toastr.errorToastr(error);
      });
}
}
