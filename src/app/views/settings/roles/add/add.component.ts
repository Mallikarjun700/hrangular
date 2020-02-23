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
  
  roleForm: FormGroup;
  id: any;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CurdcommonserviceService,
    public toastr: ToastrManager) { }

  ngOnInit() {
    this.roleForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required]
    });
    if (this.route.snapshot.params['id']) {
      this.id = this.route.snapshot.params['id'];
      this.commonService.get('role/show/' + this.id, {})
        .subscribe(
          data => {
            if (data.success) {
              this.roleForm = this.formBuilder.group({
                id: [data.message.id],
                name: [data.message.name, Validators.required],
              });
            }
          });
    }

  }

  get f() { return this.roleForm.controls; }

  onSubmit() {
    // stop here if form is invalid
    if (this.roleForm.invalid) {
      return;
    }
    let URL = 'role/post';
    if (this.route.snapshot.params['id']) {
      URL = 'role/update/' + this.id;
    }
    this.commonService.post(URL, { name: this.f.name.value })
      .subscribe(
        details => {
          if (details.success) {
            this.toastr.successToastr('Role saved sucessfully');
            this.router.navigate(['/home/settings/role/list']);
          }
        },
        error => {
          this.toastr.errorToastr(error);
        });
  }
  cancel() {
    this.router.navigate(['/home/settings/role/list']);
  }

}
