import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CurdcommonserviceService } from '../../../../_services';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-addevent',
  templateUrl: './addevent.component.html',
  styleUrls: ['./addevent.component.scss']
})
export class AddeventComponent {
  public firstFormGroup: FormGroup;
  dropdown:any;

  getCompanyProfileDependency(){
    this.commonService.get('companyprofile/get', {})
      .subscribe(
        data => {
          if (data.success) {
            this.dropdown.company_profiles = data.message;
          }
        });
  }
  initiateFirstFormGroup(data?: any) {
    this.firstFormGroup = this._formBuilder.group({
      id: [(data) ? data.id : ''],
      name: [(data) ? data.name : '', Validators.required],
      company_id: [(data) ? data.company_id : '', Validators.required],
      date: [(data) ? data.date : '', Validators.required]
    });
  }
  constructor(
    public dialogRef: MatDialogRef<AddeventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CurdcommonserviceService,
    public toastr: ToastrManager) {
    console.log(data);
    this.dropdown=[];
    this.getCompanyProfileDependency();
    this.initiateFirstFormGroup(data);
  }
  
  get f1() { return this.firstFormGroup.controls; }

  onSubmit() {
    if (this.firstFormGroup.invalid) {
      return;
    }
    let params = Object.assign({}, this.firstFormGroup.value);
    console.log(params);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
