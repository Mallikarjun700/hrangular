import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CurdcommonserviceService } from '../../../_services';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {
  commonDataForm: FormGroup;
  dropdown: any;
  constructor(private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CurdcommonserviceService,
    public toastr: ToastrManager) { }



  initiateFirstFormGroup(data?: any) {
    this.commonDataForm = this._formBuilder.group({
      id: [(data) ? data.id : ''],
      locations: this._formBuilder.array([]),
      department: this._formBuilder.array([]),
      sub_departments: this._formBuilder.array([]),
      cost_centers: this._formBuilder.array([]),
      pay_grades: this._formBuilder.array([]),
      bands: this._formBuilder.array([]),
      designation: this._formBuilder.array([]),
      job_code: this._formBuilder.array([]),
      job_role: this._formBuilder.array([]),
      job_title: this._formBuilder.array([]),
      work_levels: this._formBuilder.array([]),
      position_code: this._formBuilder.array([]),
    });
  }

  createLocationFormGroup(data?: any) {
    return this._formBuilder.group({
      location_code: [(data) ? data.location_code : '', [Validators.required]]
    });
  }
  get locations(): FormArray {
    return this.commonDataForm.get('locations') as FormArray;
  }
  addLocationValue(data?: any) {
    console.log(this.locations.controls)
    let invalidCount=0;
    this.locations.controls.forEach(element => {
      if(element.invalid && element.get('location_code').errors){
        invalidCount++;
      }
    });
    if(invalidCount==0){
      let fg = this.createLocationFormGroup(data);
      this.locations.push(fg);
    }
  }
  deleteLocationValue(idx: number) {
    this.locations.removeAt(idx);
  }

  createDepartmentFormGroup(data?: any) {
    return this._formBuilder.group({
      department: [(data) ? data.department : '', [Validators.required]]
    });
  }
  get department(): FormArray {
    return this.commonDataForm.get('department') as FormArray;
  }
  addDepartmentValue(data?: any) {
    let fg = this.createDepartmentFormGroup(data);
    this.department.push(fg);
  }
  deleteDepartmentValue(idx: number) {
    this.department.removeAt(idx);
  }

  createSubDepartmentsFormGroup(data?: any) {
    return this._formBuilder.group({
      sub_departments: [(data) ? data.sub_departments : '', [Validators.required]]
    });
  }
  get sub_departments(): FormArray {
    return this.commonDataForm.get('sub_departments') as FormArray;
  }
  addSubDepartmentsValue(data?: any) {
    let fg = this.createSubDepartmentsFormGroup(data);
    this.sub_departments.push(fg);
  }
  deleteSubDepartmentsValue(idx: number) {
    this.sub_departments.removeAt(idx);
  }
  
  createCostCentersFormGroup(data?: any) {
    return this._formBuilder.group({
      cost_centers: [(data) ? data.cost_centers : '', [Validators.required]]
    });
  }
  get cost_centers(): FormArray {
    return this.commonDataForm.get('cost_centers') as FormArray;
  }
  addCostCentersValue(data?: any) {
    let fg = this.createCostCentersFormGroup(data);
    this.cost_centers.push(fg);
  }
  deleteCostCentersValue(idx: number) {
    this.cost_centers.removeAt(idx);
  }

  createPayGradesFormGroup(data?: any) {
    return this._formBuilder.group({
      pay_grades: [(data) ? data.pay_grades : '', [Validators.required]]
    });
  }
  get pay_grades(): FormArray {
    return this.commonDataForm.get('pay_grades') as FormArray;
  }
  addPayGradesValue(data?: any) {
    let fg = this.createPayGradesFormGroup(data);
    this.pay_grades.push(fg);
  }
  deletePayGradesValue(idx: number) {
    this.pay_grades.removeAt(idx);
  }

  createBandsFormGroup(data?: any) {
    return this._formBuilder.group({
      bands: [(data) ? data.bands : '', [Validators.required]]
    });
  }
  get bands(): FormArray {
    return this.commonDataForm.get('bands') as FormArray;
  }
  addBandsValue(data?: any) {
    let fg = this.createBandsFormGroup(data);
    this.bands.push(fg);
  }
  deleteBandsValue(idx: number) {
    this.bands.removeAt(idx);
  }

  createDesignationFormGroup(data?: any) {
    return this._formBuilder.group({
      designation: [(data) ? data.designation : '', [Validators.required]]
    });
  }
  get designation(): FormArray {
    return this.commonDataForm.get('designation') as FormArray;
  }
  addDesignationValue(data?: any) {
    let fg = this.createDesignationFormGroup(data);
    this.designation.push(fg);
  }
  deleteDesignationValue(idx: number) {
    this.designation.removeAt(idx);
  }

  createJobCodeFormGroup(data?: any) {
    return this._formBuilder.group({
      job_code: [(data) ? data.job_code : '', [Validators.required]]
    });
  }
  get job_code(): FormArray {
    return this.commonDataForm.get('job_code') as FormArray;
  }
  addJobCodeValue(data?: any) {
    let fg = this.createJobCodeFormGroup(data);
    this.job_code.push(fg);
  }
  deleteJobCodeValue(idx: number) {
    this.job_code.removeAt(idx);
  }

  createJobRoleFormGroup(data?: any) {
    return this._formBuilder.group({
      job_role: [(data) ? data.job_role : '', [Validators.required]]
    });
  }
  get job_role(): FormArray {
    return this.commonDataForm.get('job_role') as FormArray;
  }
  addJobRoleValue(data?: any) {
    let fg = this.createJobRoleFormGroup(data);
    this.job_role.push(fg);
  }
  deleteJobRoleValue(idx: number) {
    this.job_role.removeAt(idx);
  }


  createJobTitleFormGroup(data?: any) {
    return this._formBuilder.group({
      job_title: [(data) ? data.job_title : '', [Validators.required]]
    });
  }
  get job_title(): FormArray {
    return this.commonDataForm.get('job_title') as FormArray;
  }
  addJobTitleValue(data?: any) {
    let fg = this.createJobTitleFormGroup(data);
    this.job_title.push(fg);
  }
  deleteJobTitleValue(idx: number) {
    this.job_title.removeAt(idx);
  }

  createWorkLevelsFormGroup(data?: any) {
    return this._formBuilder.group({
      work_levels: [(data) ? data.work_levels : '', [Validators.required]]
    });
  }
  get work_levels(): FormArray {
    return this.commonDataForm.get('work_levels') as FormArray;
  }
  addWorkLevelsValue(data?: any) {
    let fg = this.createWorkLevelsFormGroup(data);
    this.work_levels.push(fg);
  }
  deleteWorkLevelsValue(idx: number) {
    this.work_levels.removeAt(idx);
  }

  createPositionCodeFormGroup(data?: any) {
    return this._formBuilder.group({
      position_code: [(data) ? data.position_code : '', [Validators.required]]
    });
  }
  get position_code(): FormArray {
    return this.commonDataForm.get('position_code') as FormArray;
  }
  addPositionCodeValue(data?: any) {
    let fg = this.createPositionCodeFormGroup(data);
    this.position_code.push(fg);
  }
  deletePositionCodeValue(idx: number) {
    this.position_code.removeAt(idx);
  }

  ngOnInit() {
    this.dropdown = [];
    this.dropdown.employemntTypes = ['Permanent', 'Contract', 'Vendor', 'Consultant', 'Intern', 'Full Time', 'Part Time'];
    this.dropdown.bereavementLeaves = ['Casual Leave', 'Child Adoption Leave', 'Earned Leave', 'Leave Without Pay', 'Maternity Leaves', 'Optional Holiday', 'Paternity Leaves', 'Sick Leave', 'Wedding Leave'];
    
    this.initiateFirstFormGroup();
    this.addLocationValue();
    this.addDepartmentValue();
    this.addSubDepartmentsValue();
    this.addCostCentersValue();
    this.addPayGradesValue();
    this.addBandsValue();
    this.addDesignationValue();
    this.addJobCodeValue();
    this.addJobRoleValue();
    this.addJobTitleValue();
    this.addWorkLevelsValue();
    this.addPositionCodeValue();
  }
  get f() { return this.commonDataForm.controls; }

  onSubmitCommonData() {
    console.log(this.f)

    // stop here if form is invalid
    if (this.commonDataForm.invalid) {
      return;
    }
    let URL = 'maplist/post';
    let params=this.commonDataForm.value;
    Object.keys(params).forEach((keys: any, vals: any) => {
      if(typeof params[keys] !== 'string' && params[keys].length > 0){
        params[keys] = (JSON.stringify(params[keys]));
      }
    });
    console.log(params);
    this.commonService.post(URL, params)
      .subscribe(
        details => {
          // if (details.success) {
          //   this.toastr.successToastr('Profile saved sucessfully');
          //   this.router.navigate(['/home/onboarding/personalinfo']);
          // } else {
          //   this.toastr.errorToastr(details.message);
          // }
        },
        error => {
          const error_array = (JSON.parse(error));
          const keys = Object.keys(error_array);
          keys.forEach(element => {
            this.toastr.errorToastr(error_array[element][0]);
          });
        });
  }

  cancel(){
    
  }

}
