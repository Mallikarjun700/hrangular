import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { CurdcommonserviceService, AuthenticationService } from '../../../../_services';
import { ToastrManager } from 'ng6-toastr-notifications';
import { removeSpaces } from '../../../../_helpers/customvalidator';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import { SubComponentComponent } from './sub-component/sub-component.component';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';


const moment = _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-salary-structure-add',
  templateUrl: './salary-structure-add.component.html',
  styleUrls: ['./salary-structure-add.component.scss'],
  providers: [{
    provide: DateAdapter,
    useClass: MomentDateAdapter,
    deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
  },
  { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },]
})
export class SalaryStructureAddComponent implements OnInit {
  public fixedFormGroup: FormGroup;
  public flexiFormGroup: FormGroup;
  public variableFormGroup: FormGroup;
  public applysalaryFormGroup: FormGroup;
  public NUMBER = /^(0|[1-9][0-9]*)$/;
  dropdown: any;
  id: any;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CurdcommonserviceService,
    private authenticationService: AuthenticationService,
    public toastr: ToastrManager, private matDialog: MatDialog) { }

  initiateFixedFormGroup(data?: any) {
    this.fixedFormGroup = this.formBuilder.group({
      fixeddetails: this.formBuilder.array([]),
    });
  }
  createFixeddetailsFormGroup(data?: any) {
    return this.formBuilder.group({
      component: [(data && data.component) ? data.component : '', [Validators.required, removeSpaces]],
      paytype: [(data && data.paytype) ? data.paytype : 1, [Validators.required, removeSpaces]],
      formula: [(data && data.formula) ? data.formula : ""],
      calculation: [(data && data.calculation) ? data.calculation : ''],
      calculationdetails: this.formBuilder.array([]),
      type: [(data) ? data.type : 1],
      formula_enable: [(data) ? data.formula_enable : 1]
    });
  }
  createCalculationdetailsFormGroup(data?: any) {
    return this.formBuilder.group({
      base: [(data && data.base) ? data.base : 1],
      basetext: [(data && data.basetext) ? data.basetext : 1],
      typetext: [(data && data.typetext) ? data.typetext : 1],
      type: [(data) ? data.type : 1],
      basevalue: [(data && data.basevalue) ? data.basevalue : 1],
      result_if_type: [(data && data.result_if_type) ? data.result_if_type : 1],
      result_if: [(data && data.result_if) ? data.result_if : 0],
      result_if_type_text: [(data && data.result_if_type_text) ? data.result_if_type_text : 0],
      result_else_type_text: [(data && data.result_else_type_text) ? data.result_else_type_text : 0],
      result_else_type: [(data && data.result_else_type) ? data.result_else_type : 1],
      result_else: [(data && data.result_else) ? data.result_else : 0]
    });
  }

  addCalculationdetailsValue(data?: any, index?: any) {
    const ctrl = (<FormArray>this.fixedFormGroup.get('fixeddetails')).at(index).get('calculationdetails') as FormArray;
    ctrl.clear();
    let fg = this.createCalculationdetailsFormGroup(data);
    ctrl.push(fg);
  }
  get fixeddetails(): FormArray {
    return this.fixedFormGroup.get('fixeddetails') as FormArray;
  }
  addFixeddetailsValue(data?: any) {
    let invalidCount = 0;
    this.fixeddetails.controls.forEach(element => {
      if (element.invalid && element.get('type').value !== 0) {
        invalidCount++;
      }
    });
    if (invalidCount == 0) {
      let fg = this.createFixeddetailsFormGroup(data);
      this.fixeddetails.push(fg);
    }
  }
  deleteFixeddetailsValue(idx: number) {
    this.fixeddetails.removeAt(idx);
  }

  initiateFlexiFormGroup(data?: any) {
    this.flexiFormGroup = this.formBuilder.group({
      flexidetails: this.formBuilder.array([]),
    });
  }
  createFlexidetailsFormGroup(data?: any) {
    return this.formBuilder.group({
      component: [(data && data.component) ? data.component : '', [Validators.required, removeSpaces]],
      paytype: [(data && data.paytype) ? data.paytype : 1, [Validators.required, removeSpaces]],
      monthly_eligibility: [(data && data.monthly_eligibility) ? data.monthly_eligibility : '', [Validators.required, removeSpaces]],
      annual_eligibility: [(data && data.annual_eligibility) ? data.annual_eligibility : '', [Validators.required, removeSpaces]],
      paid_monthly: [(data && data.paid_monthly) ? data.paid_monthly : 1, [Validators.required, removeSpaces]],
      monthly_tax_applied: [(data && data.monthly_tax_applied) ? data.monthly_tax_applied : 1, [Validators.required, removeSpaces]],
      proofs_submitted: [(data && data.proofs_submitted) ? data.proofs_submitted : 1, [Validators.required, removeSpaces]],
      reimburse_proof_submission: [(data && data.reimburse_proof_submission) ? data.reimburse_proof_submission : 1, [Validators.required, removeSpaces]],
      lop_dependent: [(data && data.lop_dependent) ? data.lop_dependent : 1, [Validators.required, removeSpaces]],
      include_ctc: [(data && data.include_ctc) ? data.include_ctc : 1, [Validators.required, removeSpaces]],
      type: [(data) ? data.type : 1]
    });
  }
  get flexidetails(): FormArray {
    return this.flexiFormGroup.get('flexidetails') as FormArray;
  }
  addFlexidetailsValue(data?: any) {
    let invalidCount = 0;
    this.flexidetails.controls.forEach(element => {
      if (element.invalid && element.get('type').value !== 0) {
        invalidCount++;
      }
    });
    if (invalidCount === 0) {
      let fg = this.createFlexidetailsFormGroup(data);
      this.flexidetails.push(fg);
    }
  }
  deleteFlexidetailsValue(idx: number) {
    this.flexidetails.removeAt(idx);
  }

  initiateVariableFormGroup(data?: any) {
    this.variableFormGroup = this.formBuilder.group({
      variabledetails: this.formBuilder.array([]),
    });
  }
  createVariabledetailsFormGroup(data?: any) {
    return this.formBuilder.group({
      component: [(data && data.component) ? data.component : '', [Validators.required, removeSpaces]],
      paytype: [(data && data.paytype) ? data.paytype : 1, [Validators.required, removeSpaces]],
      base: [(data && data.base) ? data.base : '', [Validators.required, removeSpaces]],
      percentage_or_value: [(data && data.percentage_or_value) ? data.percentage_or_value : '', [Validators.required, removeSpaces, Validators.pattern(this.NUMBER)]],
      lop_dependent: [(data && data.lop_dependent) ? data.lop_dependent : 1, [Validators.required, removeSpaces]],
      include_ctc: [(data && data.include_ctc) ? data.include_ctc : 1, [Validators.required, removeSpaces]],
      payment_frequency: [(data && data.payment_frequency) ? data.payment_frequency : 1, [Validators.required, removeSpaces]],
      payment_reminder: [(data && data.payment_reminder) ? data.payment_reminder : moment(), [Validators.required, removeSpaces]],
      type: [(data) ? data.type : 1]
    });
  }
  chosenYearHandler(normalizedYear: Moment, index: any) {
    const ctrl = this.variableFormGroup.get('variabledetails') as FormArray;
    const ctrlValue = this.variabledetails.controls[index].value.payment_reminder;
    ctrlValue.year(normalizedYear.year());
    ctrl.at(index).patchValue({ payment_reminder: (ctrlValue) });
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>, index: any) {
    const ctrl = this.variableFormGroup.get('variabledetails') as FormArray;
    const ctrlValue = this.variabledetails.controls[index].value.payment_reminder;
    ctrlValue.month(normalizedMonth.month());
    ctrl.at(index).patchValue({ payment_reminder: (ctrlValue) });
    datepicker.close();
  }
  get variabledetails(): FormArray {
    return this.variableFormGroup.get('variabledetails') as FormArray;
  }
  addVariabledetailsValue(data?: any) {
    let invalidCount = 0;
    this.variabledetails.controls.forEach(element => {
      if (element.invalid && element.get('type').value !== 0) {
        invalidCount++;
      }
    });
    if (invalidCount === 0) {
      let fg = this.createVariabledetailsFormGroup(data);
      this.variabledetails.push(fg);
    }
  }
  deleteVariabledetailsValue(idx: number) {
    this.variabledetails.removeAt(idx);
  }

  initiateApplySalaryFormGroup(data?: any) {
    this.applysalaryFormGroup = this.formBuilder.group({
      applysalary: this.formBuilder.array([]),
    });
  }
  createApplySalaryFormGroup(data?: any) {
    return this.formBuilder.group({
      designation: [(data && data.designation) ? data.designation : '', [Validators.required, removeSpaces]]
    });
  }
  get applysalary(): FormArray {
    return this.applysalaryFormGroup.get('applysalary') as FormArray;
  }
  addApplySalaryValue(data?: any) {
    let invalidCount = 0;
    this.applysalary.controls.forEach(element => {
      if (element.invalid) {
        invalidCount++;
      }
    });
    if (invalidCount == 0) {
      let fg = this.createApplySalaryFormGroup(data);
      this.applysalary.push(fg);
    }
  }
  deleteApplySalaryValue(idx: number) {
    this.applysalary.removeAt(idx);
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
    this.dropdown = {
      paytype_dependent: [
        { id: 1, name: 'Earning' },
        { id: 2, name: 'Deduction' },
      ],
      formula_dependent: [
        { id: 1, name: 'Formula 1' },
        { id: 2, name: 'Formula 2' },
      ],
      yesno_dependent: [
        { id: 1, name: 'Yes' },
        { id: 2, name: 'No' },
      ],
      yesno_dependent_include_not: [
        { id: 1, name: 'Yes' },
        { id: 2, name: 'No' },
        { id: 3, name: 'Not Applicable' },
      ],
      month_dependent: [
        { id: 1, name: 'Monthly' },
        { id: 2, name: 'Half Yearly' },
        { id: 3, name: 'Annually' },
      ],
      month_dependent_include_not: [
        { id: 1, name: 'Monthly' },
        { id: 2, name: 'Half Yearly' },
        { id: 3, name: 'Annually' },
        { id: 4, name: 'Not Applicable' },
      ],
      default_fixed_salary_dependent: [
        { component: 'Basic', paytype: 1, type: 0, formula_enable: 1, formula: "" },
        { component: 'HRA', paytype: 1, type: 0, formula_enable: 1, formula: "" },
        { component: 'Spl Allowance', paytype: 1, type: 0, formula_enable: 0 },
        { component: 'PF Employer', paytype: 2, type: 0, formula_enable: 0 },
        { component: 'ESI Employer', paytype: 2, type: 0, formula_enable: 0 },
      ],
      default_flexi_salary_dependent: [
        { component: 'LTA', paytype: 1, type: 0 },
        { component: 'Telephone Allowance', paytype: 1, type: 0 },
        { component: 'Fuel Expenses', paytype: 1, type: 0 },
      ],
      default_variable_salary_dependent: [
        { component: 'Variable Pay', paytype: 1, type: 0, payment_reminder: moment() },
        { component: 'Annual Bonus', paytype: 1, type: 0, payment_reminder: moment() },
        { component: 'Performacnce Bonus', paytype: 1, type: 0, payment_reminder: moment() }
      ],
      designation: []
    };
    this.commonService.get('masterlist/7', {})
      .subscribe(
        data => {
          setTimeout(() => { this.authenticationService.loaderEnd(); }, 10);
          if (data.success) {
            this.dropdown.designation = (data.message.designation);
          }
        });
    this.initiateFixedFormGroup();
    this.initiateFlexiFormGroup();
    this.initiateVariableFormGroup();
    this.initiateApplySalaryFormGroup();

    if (this.route.snapshot.params['id']) {
      this.id = this.route.snapshot.params['id'];
      this.commonService.get('salarystructure/' + this.id, {})
        .subscribe(
          data => {
            setTimeout(() => { this.authenticationService.loaderEnd(); }, 10);
            if (data.success) {
              console.log(data.message);
              Object.keys(data.message).forEach((keys: any, vals: any) => {
                const jsonCheck = this.IsJsonString(data.message[keys])
                if (jsonCheck) {
                  data.message[keys] = (JSON.parse(data.message[keys]));
                }
              });
              this.initiateFixedFormGroup(data.message);
              data.message.fixed.forEach(element => {
                this.addFixeddetailsValue(element);
              });
              this.initiateFlexiFormGroup();
              data.message.flexi.forEach(element => {
                this.addFixeddetailsValue(element);
              });
              this.initiateVariableFormGroup();
              data.message.variable.forEach(element => {
                this.addFixeddetailsValue(element);
              });
              this.initiateApplySalaryFormGroup();
              data.message.apply_salary.forEach(element => {
                this.addApplySalaryValue(element);
              });
            }
          });
    } else {
      this.dropdown.default_fixed_salary_dependent.forEach(element => {
        this.addFixeddetailsValue(element);
      });
      this.dropdown.default_flexi_salary_dependent.forEach(element => {
        this.addFlexidetailsValue(element);
      });
      this.dropdown.default_variable_salary_dependent.forEach(element => {
        this.addVariabledetailsValue(element);
      });
      this.addApplySalaryValue();
    }
  }


  formulaClick(value: any, index: any) {
    this.formulaChange(value, index)
  }

  public dropdownUniqueCheck(value: any, indexKey: any): boolean {
    let re = false;
    const ctrltask = this.applysalaryFormGroup.get('applysalary') as FormArray;
    ctrltask.value.forEach((val: any, indexval: number) => {
      if (!re && (val[indexKey]) === (value)) {
        re = true;
      }
    });
    return re;
  }

  formulaChange(value: any, index: any) {
    const ctrl = this.fixedFormGroup.get('fixeddetails') as FormArray;
    ctrl.at(index).patchValue({ calculation: '' });
    if (value.formula !== '' && value.formula != null) {
      this.matDialog.closeAll();
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '600px';
      dialogConfig.data = value;
      dialogConfig.panelClass = 'custom-salarymodalbox';
      const dialogRef = this.matDialog.open(SubComponentComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(
        data => {
          if (data) {
            console.log(data);
            if (value.formula === '1') {
              let calculation = '';
              if (parseInt(data.type) === 1) {
                calculation = (data.basetext + ' * ' + (data.basevalue / 100) + '' + data.typetext)
              } else {
                calculation = (data.basevalue)
              }
              ctrl.at(index).patchValue({ calculation: calculation });
            } else if (value.formula === '2') {
              let calculation = 'if ' + data.basetext + '' + data.typetext + data.basevalue + ' then ';
              if (parseInt(data.result_if_type) === 1) {
                calculation += (data.basetext + ' * ' + (data.result_if / 100) + '' + data.result_if_type_text) + ' else ';
              } else {
                calculation += (data.result_if) + ' else ';
              }
              if (parseInt(data.result_else_type) === 1) {
                calculation += (data.basetext + ' * ' + (data.result_else / 100) + '' + data.result_else_type_text) + ' end ';
              } else {
                calculation += (data.result_else) + ' end ';
              }
              ctrl.at(index).patchValue({ calculation: calculation });
            }
            this.addCalculationdetailsValue(data, index)
            console.log(this.fixedFormGroup.value);
          }
        });
    }
  }

  onSubmit() {
    if (this.fixedFormGroup.invalid || this.flexiFormGroup.invalid || this.variableFormGroup.invalid || this.applysalaryFormGroup.invalid) {
      this.fixedFormGroup.markAllAsTouched();
      this.flexiFormGroup.markAllAsTouched();
      this.variableFormGroup.markAllAsTouched();
      this.applysalaryFormGroup.markAllAsTouched();
      // this.validateAllFields(this.fixedFormGroup); 
      // this.validateAllFields(this.flexiFormGroup); 
      // this.validateAllFields(this.variableFormGroup); 
      // this.validateAllFields(this.applysalaryFormGroup); 
      return;
    }
    let params = Object.assign({},
      this.fixedFormGroup.value,
      this.flexiFormGroup.value,
      this.variableFormGroup.value,
      this.applysalaryFormGroup.value,);
    let URL = 'salarystructure';
    if (this.route.snapshot.params['id']) {
      URL = 'salarystructure/' + this.id;
    }
    Object.keys(params).forEach((keys: any, vals: any) => {
      if(typeof params[keys] !== 'string' && params[keys].length > 0){
        params[keys] = (JSON.stringify(params[keys]));
      }
    });
    let convertParam={
      fixed:params.fixeddetails,
      flexi:params.flexidetails,
      variable:params.variabledetails,
      apply_salary:params.applysalary,
    }
    this.commonService.post(URL, convertParam)
      .subscribe(
        details => {
          setTimeout(() => {this.authenticationService.loaderEnd();}, 10);
          if (details.success) {
            this.toastr.successToastr('Salary structure saved sucessfully');
            this.router.navigate(['/home/payroll/salary-structure']);
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


  resetForm() {
    this.router.navigate(['/home/payroll/salary-structure']);
  }
}
