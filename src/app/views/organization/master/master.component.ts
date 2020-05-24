import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CurdcommonserviceService, AuthenticationService } from '../../../_services';
import { ToastrManager } from 'ng6-toastr-notifications';
import { removeSpaces } from '../../../_helpers/customvalidator';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {
  commonDataForm: FormGroup;
  mappingDataForm: FormGroup;
  dropdown: any;
  dropdownMappingData: any;
  id : any = '7';

  constructor(private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CurdcommonserviceService,
    private authenticationService: AuthenticationService,
    public toastr: ToastrManager) { }



  initiateFirstFormGroup(data?: any) {
    this.commonDataForm = this._formBuilder.group({
      id: [(data) ? data.id : 7],
      locations: this._formBuilder.array([]),
      department: this._formBuilder.array([]),
      subdepartment: this._formBuilder.array([]),
      cost_centers: this._formBuilder.array([]),
      pay_grades: this._formBuilder.array([]),
      brands: this._formBuilder.array([]),
      designation: this._formBuilder.array([]),
      job_code: this._formBuilder.array([]),
      job_role: this._formBuilder.array([]),
      job_profile: this._formBuilder.array([]),
      work_level: this._formBuilder.array([]),
      position_code: this._formBuilder.array([]),
      mapdata: this._formBuilder.array([]),
    });
  }

  createLocationFormGroup(data?: any) {
    return this._formBuilder.group({
      location_code: [(data) ? data.location_code : '', [Validators.required, removeSpaces]]
    });
  }
  get locations(): FormArray {
    return this.commonDataForm.get('locations') as FormArray;
  }
  addLocationValue(data?: any) {
    console.log(this.locations.controls)
    let invalidCount = 0;
    this.locations.controls.forEach(element => {
      if (element.invalid && element.get('location_code').errors) {
        invalidCount++;
      }
    });
    if (invalidCount == 0) {
      let fg = this.createLocationFormGroup(data);
      this.locations.push(fg);
    }
  }
  deleteLocationValue(idx: number) {
    this.locations.removeAt(idx);
  }

  createDepartmentFormGroup(data?: any) {
    return this._formBuilder.group({
      department: [(data) ? data.department : '', [Validators.required, removeSpaces]]
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
      subdepartment: [(data) ? data.subdepartment : '', [Validators.required, removeSpaces]]
    });
  }
  get subdepartment(): FormArray {
    return this.commonDataForm.get('subdepartment') as FormArray;
  }
  addSubDepartmentsValue(data?: any) {
    let fg = this.createSubDepartmentsFormGroup(data);
    this.subdepartment.push(fg);
  }
  deleteSubDepartmentsValue(idx: number) {
    this.subdepartment.removeAt(idx);
  }

  createCostCentersFormGroup(data?: any) {
    return this._formBuilder.group({
      cost_centers: [(data) ? data.cost_centers : '', [Validators.required, removeSpaces]]
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
      pay_grades: [(data) ? data.pay_grades : '', [Validators.required, removeSpaces]]
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
      brands: [(data) ? data.brands : '', [Validators.required, removeSpaces]]
    });
  }
  get brands(): FormArray {
    return this.commonDataForm.get('brands') as FormArray;
  }
  addBandsValue(data?: any) {
    let fg = this.createBandsFormGroup(data);
    this.brands.push(fg);
  }
  deleteBandsValue(idx: number) {
    this.brands.removeAt(idx);
  }

  createDesignationFormGroup(data?: any) {
    return this._formBuilder.group({
      designation: [(data) ? data.designation : '', [Validators.required, removeSpaces]]
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
      job_code: [(data) ? data.job_code : '', [Validators.required, removeSpaces]]
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
      job_role: [(data) ? data.job_role : '', [Validators.required, removeSpaces]]
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
      job_profile: [(data) ? data.job_profile : '', [Validators.required, removeSpaces]]
    });
  }
  get job_profile(): FormArray {
    return this.commonDataForm.get('job_profile') as FormArray;
  }
  addJobTitleValue(data?: any) {
    let fg = this.createJobTitleFormGroup(data);
    this.job_profile.push(fg);
  }
  deleteJobTitleValue(idx: number) {
    this.job_profile.removeAt(idx);
  }

  createWorkLevelsFormGroup(data?: any) {
    return this._formBuilder.group({
      work_level: [(data) ? data.work_level : '', [Validators.required, removeSpaces]]
    });
  }
  get work_level(): FormArray {
    return this.commonDataForm.get('work_level') as FormArray;
  }
  addWorkLevelsValue(data?: any) {
    let fg = this.createWorkLevelsFormGroup(data);
    this.work_level.push(fg);
  }
  deleteWorkLevelsValue(idx: number) {
    this.work_level.removeAt(idx);
  }

  createPositionCodeFormGroup(data?: any) {
    return this._formBuilder.group({
      position_code: [(data) ? data.position_code : '', [Validators.required, removeSpaces]]
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

  createMappingDataFormGroup(data?: any) {
    return this._formBuilder.group({
      id: [(data) ? data.id : ''],
      department_map: [(data) ? data.department_map : '', [Validators.required, removeSpaces]],
      designation_map: [(data) ? data.designation_map : '', [Validators.required, removeSpaces]],
      job_title_map: [(data) ? data.job_title_map : '', [Validators.required, removeSpaces]],
      work_levels_map: [(data) ? data.work_levels_map : '', [Validators.required, removeSpaces]],
      job_code_map: [(data) ? data.job_code_map : '', [Validators.required, removeSpaces]],
      cost_centers_map: [(data) ? data.cost_centers_map : '', [Validators.required, removeSpaces]],
    });
  }

  get mapdata(): FormArray {
    return this.commonDataForm.get('mapdata') as FormArray;
  }
  addMappingDataValue(data?: any) {
    let invalidCount = 0;
    if (this.mapdata.invalid) {
      invalidCount++;
    }
    if (invalidCount === 0) {
      let fg = this.createMappingDataFormGroup(data);
      this.mapdata.push(fg);
    }
  }
  deleteMappingDataValue(idx: number) {
    this.mapdata.removeAt(idx);
  }

  IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
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
    this.addMappingDataValue();


    this.commonService.get('masterlist/' + this.id, {})
    .subscribe(
      data => {
        setTimeout(() => {this.authenticationService.loaderEnd();}, 10);
        if (data.success) {
          console.log(data.message);
          Object.keys(data.message).forEach((keys: any, vals: any) => {
            const jsonCheck = this.IsJsonString(data.message[keys])
            if (jsonCheck) {
              data.message[keys] = (JSON.parse(data.message[keys]));
            }
          });
          this.initiateFirstFormGroup(data.message);
          data.message.locations.forEach(element => {
            this.addLocationValue(element);
          });
          data.message.department	.forEach(element => {
            this.addDepartmentValue(element);
          });
          data.message.subdepartment.forEach(element => {
            this.addSubDepartmentsValue(element);
          });	
          data.message.cost_centers.forEach(element => {
            this.addCostCentersValue(element);
          });
          data.message.pay_grades.forEach(element => {
            this.addPayGradesValue(element);
          });
          data.message.brands.forEach(element => {
            this.addBandsValue(element);
          });
          data.message.designation.forEach(element => {
            this.addDesignationValue(element);
          });
          data.message.job_code.forEach(element => {
            this.addJobCodeValue(element);
          });
          data.message.job_role.forEach(element => {
            this.addJobRoleValue(element);
          });
          data.message.job_profile.forEach(element => {
            this.addJobTitleValue(element);
          });
          data.message.work_level.forEach(element => {
            this.addWorkLevelsValue(element);
          });
          data.message.position_code.forEach(element => {
            this.addPositionCodeValue(element);
          });
          data.message.mapdata.forEach(element => {
            this.addMappingDataValue(element);
          });
        }
      });


  }

  get f() { return this.commonDataForm.controls; }

  onSubmitCommonData() {
    // stop here if form is invalid
    if (this.commonDataForm.invalid) {
      return;
    }
    
    let params = this.commonDataForm.value;
    let URL = 'masterlist/update/'+params.id;
    Object.keys(params).forEach((keys: any, vals: any) => {
      if (typeof params[keys] !== 'string' && params[keys].length > 0 && keys!='mapdata') {
        params[keys] = (JSON.stringify(params[keys]));
      }
    });
    console.log(params);
    this.commonService.post(URL, params)
      .subscribe(
        details => {
          setTimeout(() => { this.authenticationService.loaderEnd(); }, 10);
          console.log(details);
          if (details.success) {
            this.toastr.successToastr('Master Data Updated sucessfully');
            // this.router.navigate(['/home/onboarding/personalinfo']);
          } else {
            this.toastr.errorToastr(details.message);
          }
        },
        error => {
          const error_array = (JSON.parse(error));
          const keys = Object.keys(error_array);
          keys.forEach(element => {
            this.toastr.errorToastr(error_array[element][0]);
          });
        });
  }

  cancel() {
    this.commonDataForm.reset();
  }

  public dropdownUniqueCheck(value: any, indexKey: any): boolean {
    let re = false;
    const ctrltask = this.commonDataForm.get('mapdata') as FormArray;
    ctrltask.value.forEach((val: any, indexval: number) => {
      if (!re && (val[indexKey]) === (value)) {
        re = true;
      }
    });
    return re;
  }

}
