import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurdcommonserviceService } from '../../../../_services';
import { ToastrManager } from 'ng6-toastr-notifications';

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
    public toastr: ToastrManager) { }

  getCountryDependency(){
    this.commonService.get('country/get', {})
      .subscribe(
        data => {
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
      name: ['', Validators.required],
      country_id: ['', Validators.required],
    });
    if (this.route.snapshot.params['id']) {
      this.id = this.route.snapshot.params['id'];
      this.commonService.get('state/show/' + this.id, {})
        .subscribe(
          data => {
            if (data.success) {
              this.stateForm = this.formBuilder.group({
                id: [data.message.id],
                name: [data.message.name, Validators.required],
                country_id: [data.message.country_id, Validators.required],
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
          if (details.success) {
            this.toastr.successToastr('State saved sucessfully');
            this.router.navigate(['/home/settings/state/list']);
          }
        },
        error => {
          this.toastr.errorToastr(error);
        });
  }
  cancel() {
    this.router.navigate(['/home/settings/state/list']);
  }
}
