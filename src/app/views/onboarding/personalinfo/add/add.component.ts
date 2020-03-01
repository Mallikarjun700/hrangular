import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CurdcommonserviceService } from '../../../../_services';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  dropdown: any;
  dropdownmain: any;
  id: any;
  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;
  public thirdFormGroup: FormGroup;
  public fourthFormGroup: FormGroup;
  public fifthFormGroup: FormGroup;
  public sixthFormGroup: FormGroup;
  public seventhFormGroup: FormGroup;
  public eightFormGroup: FormGroup;
  public nineFormGroup: FormGroup;
  public EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  public PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/;
  constructor(
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CurdcommonserviceService,
    public toastr: ToastrManager) {
  }

  getCountryDependency(index?: any) {
    this.commonService.get('country/get', {})
      .subscribe(
        data => {
          if (data.success) {
            this.dropdown[index].country = data.message;
            if (this.dropdownmain.country.length === 0) {
              this.dropdownmain.country = data.message;
            }
          }
        });
  }

  createNameFormGroup(data?: any) {
    return this._formBuilder.group({
      first_name: [(data) ? data.first_name : '', [Validators.required]],
      middle_name: [(data) ? data.middle_name : ''],
      last_name: [(data) ? data.last_name : '', [Validators.required]],
    });
  }
  
  createFamilyFormGroup(data?: any) {
    return this._formBuilder.group({
      father: [(data) ? data.father : '', [Validators.required]],
      mother: [(data) ? data.mother : '', [Validators.required]],
    });
  }
  createEmailFormGroup(data?: any) {
    return this._formBuilder.group({
      office: [(data) ? data.office : '', [Validators.required, Validators.pattern(this.EMAIL_REGEX)]],
      personal: [(data) ? data.personal : '', [Validators.pattern(this.EMAIL_REGEX)]]
    });
  }
  initiateFirstFormGroup(data?: any) {
    this.firstFormGroup = this._formBuilder.group({
      id: [(data) ? data.id : ''],
      employee_id: [(data) ? data.employee_id : '',Validators.required],
      password: [(data) ? data.password : '', [Validators.required, Validators.pattern(this.PASSWORD_REGEX)]],
      name: this._formBuilder.array([],[Validators.required]),
      gender: [(data) ? data.gender : '1',Validators.required],
      family: this._formBuilder.array([],[Validators.required]),
      date_of_birth: [(data) ? data.date_of_birth : '',Validators.required],  
      blood_group: [(data) ? data.blood_group : '1',Validators.required], 
      email: this._formBuilder.array([],[Validators.required]), 
      date_of_join: [(data) ? data.date_of_join : '',Validators.required],  
      mobile_number: [(data) ? data.mobile_number : '', [Validators.min(10)]], 
      marital_status: [(data) ? data.marital_status : '',Validators.required], 
      phone_number: [(data) ? data.mobile_number : '', [Validators.min(10)]],
      temporary_address: [(data) ? data.temporary_address : ''], 
      permanent_address: [(data) ? data.permanent_address : ''],  
      international_worker: [(data) ? data.international_worker : '',Validators.required],
      country_origin: [(data) ? data.country_origin : ''],
    });
  }
  get name(): FormArray {
    return this.firstFormGroup.get('name') as FormArray;
  }
  addNameValue(data?: any) {
    let fg = this.createNameFormGroup(data);
    this.name.push(fg);
  }
  get family(): FormArray {
    return this.firstFormGroup.get('family') as FormArray;
  }
  addFamilyValue(data?: any) {
    let fg = this.createFamilyFormGroup(data);
    this.family.push(fg);
  }
  get email(): FormArray {
    return this.firstFormGroup.get('email') as FormArray;
  }
  addEmailValue(data?: any) {
    let fg = this.createEmailFormGroup(data);
    this.email.push(fg);
  }

  createPassportFormGroup(data?: any) {
    return this._formBuilder.group({
      number: [(data) ? data.number : '', [Validators.required]],
      valid_from: [(data) ? data.valid_from : '', [Validators.required]],
      valid_till: [(data) ? data.valid_till : '', [Validators.required]],
    });
  }
  initiateSecondFormGroup(data?: any) {
    this.secondFormGroup = this._formBuilder.group({
      passport: this._formBuilder.array(
        [],
        [Validators.required])
    });
  }
  get passport(): FormArray {
    return this.secondFormGroup.get('passport') as FormArray;
  }
  addPassportValue(data?: any) {
    let fg = this.createPassportFormGroup(data);
    this.passport.push(fg);
  }

  createGDFormGroup(data?: any) {
    return this._formBuilder.group({
      phisically_handicapped: [(data) ? data.phisically_handicapped : '', [Validators.required]],
      locomotive: [(data) ? data.locomotive : '', [Validators.required]],
      hearing: [(data) ? data.hearing : '', [Validators.required]],
      visual: [(data) ? data.visual : '', [Validators.required]],
    });
  }
  initiateThirdFormGroup(data?: any) {
    this.thirdFormGroup = this._formBuilder.group({
      general_details: this._formBuilder.array(
        [],
        [Validators.required])
    });
  }
  get general_details(): FormArray {
    return this.thirdFormGroup.get('general_details') as FormArray;
  }
  addGDValue(data?: any) {
    let fg = this.createGDFormGroup(data);
    this.general_details.push(fg);
  }

  createGPFormGroup(data?: any) {
    return this._formBuilder.group({
      driving_license: [(data) ? data.driving_license : ''],
      election_card: [(data) ? data.election_card : ''],
      ration_card: [(data) ? data.ration_card : ''],
      NPR: [(data) ? data.NPR : ''],
    });
  }
  initiateFourthFormGroup(data?: any) {
    this.fourthFormGroup = this._formBuilder.group({
      general_proof: this._formBuilder.array(
        [],
        [Validators.required])
    });
  }
  get general_proof(): FormArray {
    return this.fourthFormGroup.get('general_proof') as FormArray;
  }
  addGPValue(data?: any) {
    let fg = this.createGPFormGroup(data);
    this.general_proof.push(fg);
  }

  createEducationFormGroup(data?: any) {
    return this._formBuilder.group({
      name: [(data) ? data.name : '', Validators.required],
      qualification_type: [(data) ? data.qualification_type : ''],
      course_name: [(data) ? data.course_name : ''],
      course_type :[(data) ? data.course_type : ''],
      specialization:[(data) ? data.specialization : ''],
      start_date:[(data) ? data.start_date : ''],
      end_date:[(data) ? data.end_date : ''],
      college_name:[(data) ? data.college_name : ''],
      university:[(data) ? data.university : ''],
      aggregate:[(data) ? data.aggregate : '']
    });
  }
  initiateFifthFormGroup(data?: any) {
    this.fifthFormGroup = this._formBuilder.group({
      education: this._formBuilder.array(
        [],
        [Validators.required])
    });
  }
  get education(): FormArray {
    return this.fifthFormGroup.get('education') as FormArray;
  }
  addEducationValue(data?: any) {
    let fg = this.createEducationFormGroup(data);
    this.education.push(fg);
  }
  deleteEducationValue(idx: number) {
    this.education.removeAt(idx);
  }

  createRelationShipFormGroup(data?: any) {
    return this._formBuilder.group({
      name: [(data) ? data.name : ''],
      relationship: [(data) ? data.relationship : ''],
      date_of_birth: [(data) ? data.date_of_birth : ''],
      dependent :[(data) ? data.dependent : '', Validators.required],
      Address:[(data) ? data.Address : ''],
      contact_number:[(data) ? data.contact_number : '', [Validators.min(10)]]
    });
  }
  initiateSixthFormGroup(data?: any) {
    this.sixthFormGroup = this._formBuilder.group({
      relationship: this._formBuilder.array(
        [],
        [Validators.required])
    });
  }
  get relationship(): FormArray {
    return this.sixthFormGroup.get('relationship') as FormArray;
  }
  addRelationShipValue(data?: any) {
    let fg = this.createRelationShipFormGroup(data);
    this.relationship.push(fg);
  }
  deleteRelationShipValue(idx: number) {
    this.relationship.removeAt(idx);
  }

  createPCompanyDetailsFormGroup(data?: any) {
    return this._formBuilder.group({
      name: [(data) ? data.name : ''],
      designation: [(data) ? data.designation : ''],
      department: [(data) ? data.department : ''],
      experience_from :[(data) ? data.experience_from : ''],
      experience_to:[(data) ? data.experience_to : ''],
      contact_number:[(data) ? data.contact_number : '', [Validators.min(10)]]
    });
  }
  initiateSeventhFormGroup(data?: any) {
    this.seventhFormGroup = this._formBuilder.group({
      previous_company: this._formBuilder.array(
        [],
        [Validators.required])
    });
  }
  get previous_company(): FormArray {
    return this.seventhFormGroup.get('previous_company') as FormArray;
  }
  addPreviousCompanyValue(data?: any) {
    let fg = this.createPCompanyDetailsFormGroup(data);
    this.previous_company.push(fg);
  }
  deletePreviousCompanyValue(idx: number) {
    this.previous_company.removeAt(idx);
  }

  createBankDetailsFormGroup(data?: any) {
    return this._formBuilder.group({
      account_no: [(data) ? data.account_no : '', Validators.required],
      bank_name: [(data) ? data.bank_name : '', Validators.required],
      branch: [(data) ? data.branch : '', Validators.required],
      ifsc_code: [(data) ? data.ifsc_code : '', Validators.required],
    })
  }
  get bank_details(): FormArray {
    return this.eightFormGroup.get('bank_details') as FormArray;
  }
  addBankDetailsValue(data?: any) {
    let fg = this.createBankDetailsFormGroup(data);
    this.bank_details.push(fg);
  }
  deleteBankDetailsValue(idx: number) {
    this.bank_details.removeAt(idx);
  }  
  initiateEightFormGroup(data?: any) {
    this.eightFormGroup = this._formBuilder.group({
      bank_details: this._formBuilder.array(
        [],
        [Validators.required])
    });
  }

  createSavingsFormGroup(data?: any) {
    return this._formBuilder.group({
      uan_no: [(data) ? data.uan_no : ''],
      pf_no: [(data) ? data.pf_no : ''],
      esi_no: [(data) ? data.esi_no : ''],
      pf_member_id :[(data) ? data.pf_member_id : '']
    });
  }
  get saving_details(): FormArray {
    return this.nineFormGroup.get('saving_details') as FormArray;
  }
  addSavingDetailsValue(data?: any) {
    let fg = this.createSavingsFormGroup(data);
    this.saving_details.push(fg);
  }
  deleteSavingDetailsValue(idx: number) {
    this.saving_details.removeAt(idx);
  }
  initiateNineFormGroupGroup(data?: any) {
    this.nineFormGroup = this._formBuilder.group({
      saving_details: this._formBuilder.array(
        [],
        [Validators.required])
    });
  }
  ngOnInit() {
    this.dropdown = [{ country: [], state: [], city: [] }];
    this.dropdownmain = { country: [], state: [], city: [] };
    this.getCountryDependency(0);
    this.initiateFirstFormGroup();
    this.initiateSecondFormGroup();
    this.initiateThirdFormGroup();
    this.initiateFourthFormGroup();
    this.initiateFifthFormGroup();
    this.initiateSixthFormGroup();
    this.initiateSeventhFormGroup();
    this.initiateEightFormGroup();
    this.initiateNineFormGroupGroup();
    if (this.route.snapshot.params['id']) {
      this.id = this.route.snapshot.params['id'];
      this.commonService.get('employee/show/' + this.id, {})
        .subscribe(
          data => {
            if (data.success) {
              this.initiateFirstFormGroup(data.message);
              data.message.name.forEach(element => {
                this.addNameValue(element);
              });
              data.message.family.forEach(element => {
                this.addFamilyValue(element);
              });
              data.message.email.forEach(element => {
                this.addEmailValue(element);
              });
              this.initiateSecondFormGroup(data.message);
              data.message.passport.forEach(element => {
                this.addPassportValue(element);
              });
              this.initiateThirdFormGroup(data.message);
              data.message.general_details.forEach(element => {
                this.createGDFormGroup(element);
              });
              this.initiateFourthFormGroup(data.message);
              data.message.general_proof.forEach(element => {
                this.createGPFormGroup(element);
              });
              this.initiateFifthFormGroup(data.message);
              data.message.education.forEach(element => {
                this.addEducationValue(element);
              });
              this.initiateSixthFormGroup(data.message);
              data.message.relationship.forEach(element => {
                this.createRelationShipFormGroup(element);
              });
              this.initiateSeventhFormGroup(data.message);
              data.message.previous_company.forEach(element => {
                this.createPCompanyDetailsFormGroup(element);
              });
              this.initiateEightFormGroup(data.message);
              data.message.bank_details.forEach(element => {
                this.createBankDetailsFormGroup(element);
              });
              this.initiateNineFormGroupGroup(data.message);
              data.message.saving_details.forEach(element => {
                this.createSavingsFormGroup(element);
              });
            }
          });
    } else {
      this.addNameValue();
      this.addFamilyValue();
      this.addEmailValue();
      this.addPassportValue();
      this.createGDFormGroup();
      this.createGPFormGroup();
      this.addEducationValue();
      this.createRelationShipFormGroup();
      this.createPCompanyDetailsFormGroup();
      this.createBankDetailsFormGroup();
      this.createSavingsFormGroup();
    }
  }
  // convenience getter for easy access to form fields
  get f1() { return this.firstFormGroup.controls; }
  get f2() { return this.secondFormGroup.controls; }
  get f3() { return this.thirdFormGroup.controls; }
  get f4() { return this.fourthFormGroup.controls; }
  get f5() { return this.fifthFormGroup.controls; }
  get f6() { return this.sixthFormGroup.controls; }
  get f7() { return this.seventhFormGroup.controls; }
  get f8() { return this.eightFormGroup.controls; }
  get f9() { return this.nineFormGroup.controls; }

  onSubmit() {
    let params = Object.assign({},
      this.firstFormGroup.value,
      this.secondFormGroup.value,
      this.thirdFormGroup.value,
      this.fourthFormGroup.value,
      this.fifthFormGroup.value,
      this.sixthFormGroup.value,
      this.seventhFormGroup.value,
      this.eightFormGroup.value,
      this.nineFormGroup.value);
    console.log(params)
    let URL = 'employee/post';
    if (this.route.snapshot.params['id']) {
      URL = 'employee/update/' + this.id
    }
    console.log(params);
    this.commonService.post(URL, params)
      .subscribe(
        details => {
          if (details.success) {
            this.toastr.successToastr('Profile saved sucessfully');
            this.router.navigate(['/home/onboarding/personalinfo']);
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
}
