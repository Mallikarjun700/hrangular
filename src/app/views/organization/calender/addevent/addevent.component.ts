import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CurdcommonserviceService,AuthenticationService } from '../../../../_services';
import { ToastrManager } from 'ng6-toastr-notifications';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { DatePipe } from '@angular/common';
import {removeSpaces}  from '../../../../_helpers/customvalidator';

@Component({
  selector: 'app-addevent',
  templateUrl: './addevent.component.html',
  styleUrls: ['./addevent.component.scss']
})
export class AddeventComponent implements OnInit {
  selectable = true;
  id: any;
  removable = true;
  addOnBlur = true;
  emailList: any;
  minFromDate = new Date();
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  public firstFormGroup: FormGroup;
  dropdown: any;
  public EMAIL_REGEX = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'times-new-roman', name: 'Times New Roman' },
    ],
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
    ]
  };
  getCompanyProfileDependency() {
    this.commonService.get('companyevent/get', {})
      .subscribe(
        data => {
          setTimeout(() => {this.authenticationService.loaderEnd();}, 10);
          if (data.success) {
            this.dropdown.company_event = data.message;
          }
        });
  }

  initiateFirstFormGroup(data?: any) {
    this.firstFormGroup = this._formBuilder.group({
      id: [(data) ? data.id : ''],
      title: [(data) ? data.title : '', [Validators.required, removeSpaces]],
      companyevent_id: [(data) ? data.companyevent_id : '', [Validators.required, removeSpaces]],
      startdate: [(data) ? data.startdate : this.minFromDate, [Validators.required, removeSpaces]],
      enddate: [(data) ? data.enddate : '', [Validators.required, removeSpaces]],
      eventemailids: [(data) ? data.eventemailids : ''],
      emaildescription: [(data) ? data.emaildescription : ''],
      visibility: [(data) ? data.visibility : '']
    });
  }
  onChipSelect(event: any) {

  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our fruit
    if ((value || '').trim()) {
      if (!this.EMAIL_REGEX.test(value.trim())) {
        this.toastr.errorToastr("Email is not valid");
      } else {
        this.emailList.push({ email: value.trim() });
      }
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(currentIndex: any): void {
    const index = this.emailList.indexOf(currentIndex);
    if (index >= 0) {
      this.emailList.splice(index, 1);
    }
  }

  constructor(
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CurdcommonserviceService,
    private authenticationService: AuthenticationService,
    public toastr: ToastrManager,
    public datepipe: DatePipe) {
    this.dropdown = [];
    this.emailList = [];
    this.getCompanyProfileDependency();
  }
  ngOnInit(): void {
    this.initiateFirstFormGroup();
    if (this.route.snapshot.params['id']) {
      this.id = this.route.snapshot.params['id'];
      this.commonService.get('eventdata/show/' + this.id, {})
        .subscribe(
          data => {
            setTimeout(() => {this.authenticationService.loaderEnd();}, 10);
            if (data.success) {
              data.message.startdate=new Date(data.message.startdate);
              data.message.enddate=new Date(data.message.enddate);
              console.log(data.message);
              this.initiateFirstFormGroup(data.message);

              let strArray = data.message.eventemailids.split(",");
              if (strArray.length > 0) {
                strArray.forEach(element => {
                  if(element.trim()!=''){
                    this.emailList.push({ email: element.trim() });
                  }
                });
              }
            }
          });
    }
  }

  get f1() { return this.firstFormGroup.controls; }

  onSubmit() {
    if (this.firstFormGroup.invalid) {
      return;
    }
    console.log(this.emailList);

    let params = Object.assign({}, this.firstFormGroup.value);
    console.log(params);
    params.startdate=this.datepipe.transform(params.startdate, 'yyyy-MM-dd');
    params.enddate=this.datepipe.transform(params.enddate, 'yyyy-MM-dd');
    if (this.emailList.length > 0) {
      this.emailList.forEach(element => {
        if(element.email.trim()!=''){
          params.eventemailids=element.email.trim()+',';
        }
      });
    }
    let URL = 'eventdata/post';
    if (this.route.snapshot.params['id']) {
      URL = 'eventdata/update/' + this.id
    }
    console.log(params);
    this.commonService.post(URL, params)
      .subscribe(
        details => {
          setTimeout(() => {this.authenticationService.loaderEnd();}, 10);
          if (details.success) {
            this.toastr.successToastr('Event saved sucessfully');
            this.router.navigate(['/home/organization/calender']);
          } else {
            this.toastr.errorToastr(details.message);
          }
        },
        error => {
          setTimeout(() => {this.authenticationService.loaderEnd();}, 10);
          const error_array = (JSON.parse(error));
          const keys = Object.keys(error_array);
          keys.forEach(element => {
            this.toastr.errorToastr(error_array[element][0]);
          });
        });
  }
  cancel() {
    this.router.navigate(['/home/organization/calender']);
  }
}
