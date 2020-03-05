import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { CurdcommonserviceService } from '../../../../_services';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  countryForm: FormGroup;
  id: any;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CurdcommonserviceService,
    public toastr: ToastrManager) { }

  ngOnInit() {
    this.countryForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required]
    });
    if (this.route.snapshot.params['id']) {
      this.id = this.route.snapshot.params['id'];
      this.commonService.get('country/show/' + this.id, {})
        .subscribe(
          data => {
            if (data.success) {
              this.countryForm = this.formBuilder.group({
                id: [data.message.id],
                name: [data.message.name, Validators.required],
              });
            }
          });
    }

  }

  get f() { return this.countryForm.controls; }

  onSubmit() {
    // stop here if form is invalid
    if (this.countryForm.invalid) {
      return;
    }
    let URL = 'country/post';
    if (this.route.snapshot.params['id']) {
      URL = 'country/update/' + this.id;
    }
    this.commonService.post(URL, { name: this.f.name.value })
      .subscribe(
        details => {
          if (details.success) {
            this.toastr.successToastr('Country saved sucessfully');
            this.router.navigate(['/home/settings/country/list']);
          }
        },
        error => {
          this.toastr.errorToastr(error);
        });
  }
  cancel() {
    this.router.navigate(['/home/settings/country/list']);
  }
}
