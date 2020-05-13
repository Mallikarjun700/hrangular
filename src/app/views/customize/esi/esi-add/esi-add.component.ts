import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CurdcommonserviceService, AuthenticationService } from '../../../../_services';
import { ToastrManager } from 'ng6-toastr-notifications';
import {removeSpaces} from '../../../../_helpers/customvalidator';

@Component({
  selector: 'app-esi-add',
  templateUrl: './esi-add.component.html',
  styleUrls: ['./esi-add.component.scss']
})
export class EsiAddComponent implements OnInit {
  id: any;
  public NUMBER = /^(0|[1-9][0-9]*)$/;
  public PERCENTAGE = /(^100(\.0{1,2})?$)|(^([1-9]([0-9])?|0)(\.[0-9]{1,2})?$)/;

  public esiFormGroup: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CurdcommonserviceService,
    private authenticationService: AuthenticationService,
    public toastr: ToastrManager) { }

  initiateESIFormGroup(data?: any) {
    this.esiFormGroup = this.formBuilder.group({
      id: [(data) ? data.id : ''],
      esi_amount: [(data) ? data.esi_amount : '', [Validators.required, removeSpaces, Validators.pattern(this.NUMBER)]],
      employee_per: [(data) ? data.employee_per : '', [Validators.required, removeSpaces, Validators.pattern(this.PERCENTAGE)]],
      employer_per: [(data) ? data.employer_per : '', [Validators.required, removeSpaces, Validators.pattern(this.PERCENTAGE)]],
      data1: [(data) ? data.data1 : '', [Validators.required, removeSpaces]],
      data2: [(data) ? data.data2 : '', [Validators.required, removeSpaces]],
    });
  }

  ngOnInit() {
    this.initiateESIFormGroup();
    if (this.route.snapshot.params['id']) {
      this.id = this.route.snapshot.params['id'];
      this.commonService.get('esi/show/' + this.id, {})
        .subscribe(
          data => {
            setTimeout(() => {this.authenticationService.loaderEnd(); }, 10);
            if (data.success) {
              this.initiateESIFormGroup(data.message);
            }
          });
    }
  }
  get f() { return this.esiFormGroup.controls; }

  onSubmit() {
    if (this.esiFormGroup.invalid) {
      return;
    }
    let params = Object.assign({}, this.esiFormGroup.value);
    let URL = 'esi/post';
    if (this.route.snapshot.params['id']) {
      URL = 'esi/update/' + this.id;
    }
    this.commonService.post(URL, params)
      .subscribe(
        details => {
          setTimeout(() => {this.authenticationService.loaderEnd(); }, 10);
          if (details.success) {
            this.toastr.successToastr('ESI saved sucessfully');
            this.router.navigate(['/home/customize/esi']);
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

  resetForm(){
    this.esiFormGroup.reset();
    this.router.navigate(['/home/customize/esi']);
  }

}
