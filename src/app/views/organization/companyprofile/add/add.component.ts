import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CurdcommonserviceService } from '../../../../_services';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  dropdown: any;
  id: any;
  previewUrl:any = null;
  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;
  public thirdFormGroup: FormGroup;
  public fourthFormGroup: FormGroup;
  public fifthFormGroup: FormGroup;
  public sixthFormGroup: FormGroup;
  public seventhFormGroup: FormGroup;
  public eightFormGroup: FormGroup;
  public isOptional = false;
  public EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  public URL_REGEX = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  constructor(
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CurdcommonserviceService,
    public toastr: ToastrManager) {
  }
  getCountryDependency() {
    this.commonService.get('country/get', {})
      .subscribe(
        data => {
          if (data.success) {
            this.dropdown.country = data.message;
          }
        });
  }
  getStateDependency() {
    this.commonService.get('state/get', {})
      .subscribe(
        data => {
          if (data.success) {
            this.dropdown.state = data.message;
          }
        });
  }
  getCityDependency() {
    this.commonService.get('city/get', {})
      .subscribe(
        data => {
          if (data.success) {
            this.dropdown.city = data.message;
          }
        });
  }
  createRegOfficeFormGroup(data?: any) {
    return this._formBuilder.group({
      address: [(data) ? data.address : '', [Validators.required]],
      pincode: [(data) ? data.address : '', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(6)]],
      city: [(data) ? data.address : '', [Validators.required]],
      state: [(data) ? data.address : '', [Validators.required]],
      country: [(data) ? data.address : '', [Validators.required]],
    })
  }
  createBankDetailsFormGroup(data?: any) {
    return this._formBuilder.group({
      bankname: [(data) ? data.bankname : ''],
      accountnumber: [(data) ? data.accountnumber : ''],
      branch: [(data) ? data.branch : ''],
      ifsc: [(data) ? data.ifsc : ''],
    })
  }
  createDirectorsGroup(data?: any) {
    return this._formBuilder.group({
      peoplestype: ['1'],
      name: [(data) ? data.name : ''],
      emailid: [(data) ? data.emailid : '', [Validators.pattern(this.EMAIL_REGEX)]],
      din: [(data) ? data.din : ''],
      phonenumber: [(data) ? data.phonenumber : '', [Validators.pattern("^[0-9]*$"), Validators.min(10)]],
    })
  }
  createAuditorsFormGroup(data?: any) {
    return this._formBuilder.group({
      peoplestype: ['1'],
      name: [(data) ? data.name : ''],
      emailid: [(data) ? data.emailid : '', [Validators.pattern(this.EMAIL_REGEX)]],
      type: [(data) ? data.type : ''],
      phonenumber: [(data) ? data.phonenumber : '', [Validators.pattern("^[0-9]*$"), Validators.min(10)]],
    })
  }
  createCompanySecretaryFormGroup(data?: any) {
    return this._formBuilder.group({
      peoplestype: ['1'],
      name: [(data) ? data.name : ''],
      emailid: [(data) ? data.emailid : '', [Validators.pattern(this.EMAIL_REGEX)]],
      phonenumber: [(data) ? data.phonenumber : '', [Validators.pattern("^[0-9]*$"), Validators.min(10)]],
    })
  }
  createSocialFormGroup(data?: any) {
    return this._formBuilder.group({
      linkedin: [(data) ? data.linkedin : '', [Validators.pattern(this.URL_REGEX)]],
      facebook: [(data) ? data.facebook : '', [Validators.pattern(this.URL_REGEX)]],
      twitter: [(data) ? data.twitter : '', [Validators.pattern(this.URL_REGEX)]],
    })
  }
  initiateFirstFormGroup(data?: any) {
    this.firstFormGroup = this._formBuilder.group({
      companyname: [(data) ? data.companyname : '', Validators.required],
      brandname: [(data) ? data.brandname : '', Validators.required],
      website: [(data) ? data.website : '', [Validators.required, Validators.pattern(this.URL_REGEX)]],
      social: this._formBuilder.array([this.createSocialFormGroup()]),
    });
  }
  initiateSecondFormGroup(data?: any) {
    this.secondFormGroup = this._formBuilder.group({
      homecurrency: [(data) ? data.homecurrency : '', Validators.required],
      companyaddress: this._formBuilder.array(
        [this.createRegOfficeFormGroup()],
        [Validators.required])
    });
  }
  initiateThirdFormGroup(data?: any) {
    this.thirdFormGroup = this._formBuilder.group({
      contactperson: [(data) ? data.contactperson : '', Validators.required],
      phonenumber: [(data) ? data.phonenumber : '', [Validators.required, Validators.min(10)]],
      emialid: [(data) ? data.emialid : '', [Validators.required, Validators.pattern(this.EMAIL_REGEX)]],
    });
  }
  initiateFourthFormGroup(data?: any) {
    this.fourthFormGroup = this._formBuilder.group({
      pan: [(data) ? data.pan : '', Validators.required],
      tan: [(data) ? data.tan : '', Validators.required],
      gstin: [(data) ? data.gstin : ''],
      cin: [(data) ? data.cin : ''],
      companyentity: [(data) ? data.companyentity : ''],
    });
  }
  initiateFifthFormGroup(data?: any) {
    this.fifthFormGroup = this._formBuilder.group({
      bank: this._formBuilder.array(
        [this.createBankDetailsFormGroup()],
        [Validators.required])
    });
  }
  initiateSixthFormGroup(data?: any) {
    this.sixthFormGroup = this._formBuilder.group({
      director: this._formBuilder.array(
        [this.createDirectorsGroup()],
        [Validators.required])
    });
  }
  initiateSeventhFormGroup(data?: any) {
    this.seventhFormGroup = this._formBuilder.group({
      auditor: this._formBuilder.array(
        [this.createAuditorsFormGroup()],
        [Validators.required])
    });
  }
  initiateEightFormGroup(data?: any) {
    this.eightFormGroup = this._formBuilder.group({
      secretary: this._formBuilder.array(
        [this.createCompanySecretaryFormGroup()],
        [Validators.required])
    });
  }
  ngOnInit(): void {
    this.dropdown = { country: [], state: [], city: [] };
    this.getCountryDependency();
    this.getStateDependency();
    this.getCityDependency();
    if (this.route.snapshot.params['id']) {
      this.id = this.route.snapshot.params['id'];
      this.commonService.get('companyprofile/show/' + this.id, {})
        .subscribe(
          data => {
            if (data.success) {
              console.log(data.message);
              this.initiateFirstFormGroup(data.message);
	this.initiateSecondFormGroup(data.message);
      this.initiateThirdFormGroup(data.message);
      this.initiateFourthFormGroup(data.message);
      this.initiateFifthFormGroup(data.message);
      this.initiateSixthFormGroup(data.message);
      this.initiateSeventhFormGroup(data.message);
      this.initiateEightFormGroup(data.message);
            }
          });
    } else {
      this.initiateFirstFormGroup();
      this.initiateSecondFormGroup();
      this.initiateThirdFormGroup();
      this.initiateFourthFormGroup();
      this.initiateFifthFormGroup();
      this.initiateSixthFormGroup();
      this.initiateSeventhFormGroup();
      this.initiateEightFormGroup();
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

  get social(): FormArray {
    return this.firstFormGroup.get('social') as FormArray;
  }

  get register_office(): FormArray {
    return this.secondFormGroup.get('companyaddress') as FormArray;
  }
  addAddressValue() {
    let fg = this.createRegOfficeFormGroup();
    this.register_office.push(fg);
  }
  deleteAddressValue(idx: number) {
    this.register_office.removeAt(idx);
  }

  get bank_details(): FormArray {
    return this.fifthFormGroup.get('bank') as FormArray;
  }
  addBankValue() {
    let fg = this.createBankDetailsFormGroup();
    this.bank_details.push(fg);
  }
  deleteBankValue(idx: number) {
    this.bank_details.removeAt(idx);
  }

  get directors(): FormArray {
    return this.sixthFormGroup.get('director') as FormArray;
  }
  addDirectorsValue() {
    let fg = this.createDirectorsGroup();
    this.directors.push(fg);
  }
  deleteDirectorsValue(idx: number) {
    this.directors.removeAt(idx);
  }

  get auditors(): FormArray {
    return this.seventhFormGroup.get('auditor') as FormArray;
  }
  addAuditorsValue() {
    let fg = this.createAuditorsFormGroup();
    this.auditors.push(fg);
  }
  deleteAuditorsValue(idx: number) {
    this.auditors.removeAt(idx);
  }

  get companysecretary(): FormArray {
    return this.eightFormGroup.get('secretary') as FormArray;
  }
  addCompanySecretaryValue() {
    let fg = this.createCompanySecretaryFormGroup();
    this.companysecretary.push(fg);
  }
  deleteCompanySecretaryValue(idx: number) {
    this.companysecretary.removeAt(idx);
  }
  // fileProgress(fileInput: any) {
  //     this.fileData = <File>fileInput.target.files[0];
  //     this.preview();
  // }

  // preview() {
  //   // Show preview 
  //   var mimeType = this.fileData.type;
  //   if (mimeType.match(/image\/*/) == null) {
  //     return;
  //   }

  //   var reader = new FileReader();      
  //   reader.readAsDataURL(this.fileData); 
  //   reader.onload = (_event) => { 
  //     this.previewUrl = reader.result; 
  //   }
  // }
  onSubmit() {
    let params = Object.assign({}, this.firstFormGroup.value, this.secondFormGroup.value, this.thirdFormGroup.value,
      this.fourthFormGroup.value, this.fifthFormGroup.value, this.sixthFormGroup.value, this.seventhFormGroup.value, this.eightFormGroup.value);
    console.log(params)
    let URL = 'companyprofile/post';
    if (this.route.snapshot.params['id']) {
      URL = 'companyprofile/update/' + this.id
    }
    this.commonService.post(URL, params)
      .subscribe(
        details => {
          if (details.success) {
            this.toastr.successToastr('City saved sucessfully');
            this.router.navigate(['/home/settings/city/list']);
          }
        },
        error => {
          this.toastr.errorToastr(error);
        });
  }
}
