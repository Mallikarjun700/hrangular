import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../_services';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {
  public EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  public PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/;
  registerForm: FormGroup;
  loading = false;
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
    this.registerForm = this.formBuilder.group({
        username: ['',  Validators.required],
        email: ['', [Validators.required, Validators.pattern(this.EMAIL_REGEX)]],
        password: ['', [Validators.required, Validators.pattern(this.PASSWORD_REGEX)]],
        confirmpassword: ['', [Validators.required, Validators.pattern(this.PASSWORD_REGEX)]]
    });
}

// convenience getter for easy access to form fields
get f() { return this.registerForm.controls; }

checkExist(){
  if (this.f.email.invalid) {
      return;
  }
  this.authenticationService.registerMailCheck(this.f.email.value)
    .pipe(first())
    .subscribe(
      data => {
        if (data.success) {
          this.toastr.errorToastr(data.message);
        }
      },
      error => {
        //this.toastr.errorToastr(error.message);
      });
}

onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    this.loading = true;
    this.authenticationService.register(this.f.username.value,this.f.email.value, this.f.password.value)
        .pipe(first())
        .subscribe(
            data => {
                if (data.success) {
                  this.toastr.successToastr('Welcome to dashboard');
                  window.location.reload();
                }
            },
            error => {
              this.error=(JSON.parse(error));
              if (this.error.email) {
                this.toastr.errorToastr(this.error.email[0]);
              }
              if (this.error.name) {
                this.toastr.errorToastr(this.error.name[0]);
              }
              if (this.error.password) {
                this.toastr.errorToastr(this.error.password[0]);
              }
                this.error = error;
                this.loading = false;
            });
}
}
