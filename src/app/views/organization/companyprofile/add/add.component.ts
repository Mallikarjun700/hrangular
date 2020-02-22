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
  dropdownmain: any;
  companyentitydropdown: any;
  id: any;
  public showImage: any;
  public fileName: any;
  public upload: any;
  public UploadCrypto: any;
  previewUrl: any = null;
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
  getStateDependency(index?: any, countryId?: any) {
    let URL_GET = 'state/get';
    if ((countryId)) {
      URL_GET = 'state/country/' + countryId;
    }
    console.log(index);
    this.dropdown[index].state = [];
    if (this.dropdownmain.state.length === 0) {
      this.dropdownmain.state = [];
    }
    this.commonService.get(URL_GET, {})
      .subscribe(
        data => {
          if (data.success) {
            this.dropdown[index].state = data.message;
            if (this.dropdownmain.state.length === 0) {
              this.dropdownmain.state = data.message;
            }
          } else {
            this.dropdown[index].state = [];
          }
        });
  }
  getCityDependency(index?: any, stateId?: any) {
    let URL_GET = 'city/get';
    if ((stateId)) {
      URL_GET = 'city/state/' + stateId;
    }
    this.dropdown[index].city = [];
    if (this.dropdownmain.city.length === 0) {
      this.dropdownmain.city = [];
    }
    this.commonService.get(URL_GET, {})
      .subscribe(
        data => {
          if (data.success) {
            this.dropdown[index].city = data.message;
            if (this.dropdownmain.city.length === 0) {
              this.dropdownmain.city = data.message;
            }
          } else {
            this.dropdown[index].city = [];
          }
        });
  }
  createRegOfficeFormGroup(data?: any) {
    return this._formBuilder.group({
      id: [(data) ? data.id : ''],
      address: [(data) ? data.address : '', [Validators.required]],
      pincode: [(data) ? data.pincode : '', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(6)]],
      city: [(data) ? data.city : '', [Validators.required]],
      state: [(data) ? data.state : '', [Validators.required]],
      country: [(data) ? data.country : '', [Validators.required]],
    })
  }
  createBankDetailsFormGroup(data?: any) {
    return this._formBuilder.group({
      id: [(data) ? data.id : '', Validators.required],
      bankname: [(data) ? data.bankname : '', Validators.required],
      accountnumber: [(data) ? data.accountnumber : '', Validators.required],
      branch: [(data) ? data.branch : '', Validators.required],
      ifsc: [(data) ? data.ifsc : '', Validators.required],
    })
  }
  createDirectorsGroup(data?: any) {
    return this._formBuilder.group({
      id: [(data) ? data.id : ''],
      peoplestype: ['1'],
      name: [(data) ? data.name : ''],
      emailid: [(data) ? data.emailid : '', [Validators.pattern(this.EMAIL_REGEX)]],
      din: [(data) ? data.din : ''],
      phonenumber: [(data) ? data.phonenumber : '', [Validators.pattern("^[0-9]*$"), Validators.min(10)]],
    })
  }
  createAuditorsFormGroup(data?: any) {
    return this._formBuilder.group({
      id: [(data) ? data.id : ''],
      peoplestype: ['2'],
      name: [(data) ? data.name : ''],
      emailid: [(data) ? data.emailid : '', [Validators.pattern(this.EMAIL_REGEX)]],
      type: [(data) ? data.type : ''],
      phonenumber: [(data) ? data.phonenumber : '', [Validators.pattern("^[0-9]*$"), Validators.min(10)]],
    })
  }
  createCompanySecretaryFormGroup(data?: any) {
    return this._formBuilder.group({
      id: [(data) ? data.id : ''],
      peoplestype: ['3'],
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
      id: [(data) ? data.id : ''],
      companylogo: [(data) ? data.logo : ''],
      companyname: [(data) ? data.companyname : '', Validators.required],
      brandname: [(data) ? data.brandname : '', Validators.required],
      website: [(data) ? data.website : '', [Validators.required, Validators.pattern(this.URL_REGEX)]],
      social: this._formBuilder.array(
        [],
        [Validators.required]),
    });
  }
  initiateSecondFormGroup(data?: any) {
    this.secondFormGroup = this._formBuilder.group({
      homecurrency: [(data) ? data.homecurrency : '', Validators.required],
      companyaddress: this._formBuilder.array(
        [],
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
      gstin: [(data) ? data.gstin : '', Validators.required],
      cin: [(data) ? data.cin : '', Validators.required],
      companyentity: [(data) ? data.companyentity : ''],
    });
  }
  initiateFifthFormGroup(data?: any) {
    this.fifthFormGroup = this._formBuilder.group({
      bank: this._formBuilder.array(
        [],
        [Validators.required])
    });
  }
  initiateSixthFormGroup(data?: any) {
    this.sixthFormGroup = this._formBuilder.group({
      director: this._formBuilder.array(
        [],
        [Validators.required])
    });
  }
  initiateSeventhFormGroup(data?: any) {
    this.seventhFormGroup = this._formBuilder.group({
      auditor: this._formBuilder.array(
        [],
        [Validators.required])
    });
  }
  initiateEightFormGroup(data?: any) {
    this.eightFormGroup = this._formBuilder.group({
      secretary: this._formBuilder.array(
        [],
        [Validators.required])
    });
  }
  ngOnInit(): void {
    this.companyentitydropdown = [{ "id": 1, "name": "Pvt Ltd Company" }, { "id": 2, "name": "Public Ltd Listed Company" }, { "id": 3, "name": "Public Ltd Unlisted Company" }, { "id": 4, "name": "Unlimited Company" }, { "id": 5, "name": "Sole Proprietorship" }, { "id": 6, "name": "Joint Hindu Family Business" }, { "id": 7, "name": "Partnership" }, { "id": 8, "name": "Cooperatives" }, { "id": 9, "name": "Limited Liability Partnership" }, { "id": 10, "name": "Liaison Office" }, { "id": 11, "name": "Branch Office" }, { "id": 12, "name": "Project Office" }, { "id": 13, "name": "Subsidiary Company" }, { "id": 14, "name": "Trust" }, { "id": 15, "name": "AOP" }, { "id": 16, "name": "Foreign Endity" }];
    this.dropdown = [{ country: [], state: [], city: [] }];
    this.dropdownmain = { country: [], state: [], city: [] };
    this.getCountryDependency(0);
    this.getStateDependency(0);
    this.getCityDependency(0);
    this.initiateFirstFormGroup();
    this.initiateSecondFormGroup();
    this.initiateThirdFormGroup();
    this.initiateFourthFormGroup();
    this.initiateFifthFormGroup();
    this.initiateSixthFormGroup();
    this.initiateSeventhFormGroup();
    this.initiateEightFormGroup();

    if (this.route.snapshot.params['id']) {
      this.id = this.route.snapshot.params['id'];
      this.commonService.get('companyprofile/show/' + this.id, {})
        .subscribe(
          data => {
            if (data.success) {
              this.showImage = data.message.logo;
              this.initiateFirstFormGroup(data.message);
              data.message.social.forEach(element => {
                this.addSocialValue(element);
              });
              this.initiateSecondFormGroup(data.message);
              data.message.companyaddress.forEach(element => {
                this.addAddressValue(element);
              });
              this.createRegOfficeFormGroup(data.message);
              this.initiateThirdFormGroup(data.message);
              this.initiateFourthFormGroup(data.message);
              this.initiateFifthFormGroup(data.message);
              data.message.bank.forEach(element => {
                this.addBankValue(element);
              });
              this.initiateSixthFormGroup(data.message);
              this.initiateSeventhFormGroup(data.message);
              this.initiateEightFormGroup(data.message);
              data.message.people.forEach(element => {
                if (element.peoplestype === 1) {
                  this.addDirectorsValue(element);
                } else if (element.peoplestype === 2) {
                  this.addAuditorsValue(element);
                } else if (element.peoplestype === 3) {
                  this.addCompanySecretaryValue(element);
                }
              });
            }
          });
    } else {
      this.addSocialValue();
      this.addAddressValue();
      this.addBankValue();
      this.addDirectorsValue();
      this.addAuditorsValue();
      this.addCompanySecretaryValue();
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

  onFileUpload(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      this.fileName = file.name;
      reader.readAsDataURL(file);
      reader.onload = () => {
        var img = new Image();
        img.src = reader.result as string;
        if (file.size > 2097152) {
          this.toastr.errorToastr('File size exceeding 2 mb');
          this.upload = false;
        } else if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png') {
          this.UploadCrypto = reader.result;
          let fileData = this.UploadCrypto;
          this.showImage = this.UploadCrypto.split('","')[0];
          let companylogo = {
            uploadfilename: file.name,
            uploadfiletype: file.type,
            uploadurl: fileData,
            height: img.height,
            width: img.width
          };
          img.onload = () => {
            companylogo.width = img.width;
            companylogo.height = img.height;
          };
          this.firstFormGroup.patchValue({
            companylogo: companylogo
          });
          this.upload = true;
        } else {
          this.upload = false;
          this.toastr.errorToastr('Please upload Jpeg, Jpg, Png file');
        }
      };
    }
  }

  public resetLogo() {
    delete this.showImage;
    delete this.fileName;
    this.upload = true;
    this.firstFormGroup.patchValue({
      companylogo: ''
    });
  }

  get social(): FormArray {
    return this.firstFormGroup.get('social') as FormArray;
  }
  addSocialValue(data?: any) {
    let fg = this.createSocialFormGroup(data);
    this.social.push(fg);
  }
  get register_office(): FormArray {
    return this.secondFormGroup.get('companyaddress') as FormArray;
  }
  addAddressValue(data?: any) {
    let lastIndex = (this.register_office.length);
    if (lastIndex > 0) {
      this.dropdown[lastIndex] = {country: [], state: [], city: [] };
      this.dropdown[lastIndex].country = this.dropdownmain.country;
      this.dropdown[lastIndex].state = this.dropdownmain.state;
      this.dropdown[lastIndex].city = this.dropdownmain.city;
    }
    console.log(this.dropdown);
    let fg = this.createRegOfficeFormGroup(data);
    this.register_office.push(fg);
  }
  deleteAddressValue(idx: number) {
    this.dropdown.removeAt(idx);
    this.register_office.removeAt(idx);
  }

  get bank_details(): FormArray {
    return this.fifthFormGroup.get('bank') as FormArray;
  }
  addBankValue(data?: any) {
    let fg = this.createBankDetailsFormGroup(data);
    this.bank_details.push(fg);
  }
  deleteBankValue(idx: number) {
    this.bank_details.removeAt(idx);
  }

  get directors(): FormArray {
    return this.sixthFormGroup.get('director') as FormArray;
  }
  addDirectorsValue(data?: any) {
    let fg = this.createDirectorsGroup(data);
    this.directors.push(fg);
  }
  deleteDirectorsValue(idx: number) {
    this.directors.removeAt(idx);
  }

  get auditors(): FormArray {
    return this.seventhFormGroup.get('auditor') as FormArray;
  }
  addAuditorsValue(data?: any) {
    let fg = this.createAuditorsFormGroup(data);
    this.auditors.push(fg);
  }
  deleteAuditorsValue(idx: number) {
    this.auditors.removeAt(idx);
  }

  get companysecretary(): FormArray {
    return this.eightFormGroup.get('secretary') as FormArray;
  }
  addCompanySecretaryValue(data?: any) {
    let fg = this.createCompanySecretaryFormGroup(data);
    this.companysecretary.push(fg);
  }
  deleteCompanySecretaryValue(idx: number) {
    this.companysecretary.removeAt(idx);
  }

  onSubmit() {
    let params = Object.assign({},
      this.firstFormGroup.value,
      this.secondFormGroup.value,
      this.thirdFormGroup.value,
      this.fourthFormGroup.value,
      this.fifthFormGroup.value,
      this.sixthFormGroup.value,
      this.seventhFormGroup.value,
      this.eightFormGroup.value);
    console.log(params)
    let URL = 'companyprofile/post';
    if (this.route.snapshot.params['id']) {
      URL = 'companyprofile/update/' + this.id
    }
    console.log(params);
    this.commonService.post(URL, params)
      .subscribe(
        details => {
          if (details.success) {
            this.toastr.successToastr('Profile saved sucessfully');
            this.router.navigate(['/home/organization/companyprofile']);
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
