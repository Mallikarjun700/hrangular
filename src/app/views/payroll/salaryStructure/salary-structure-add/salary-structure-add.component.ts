import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { CurdcommonserviceService, AuthenticationService } from '../../../../_services';
import { ToastrManager } from 'ng6-toastr-notifications';
import {removeSpaces} from '../../../../_helpers/customvalidator';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import {Moment} from 'moment';
import {MatDatepicker} from '@angular/material/datepicker';
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
{provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},]
})
export class SalaryStructureAddComponent implements OnInit {
  public fixedFormGroup: FormGroup;
  public flexiFormGroup: FormGroup;
  public variableFormGroup: FormGroup;
  public adhocFormGroup: FormGroup;
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
      id: [(data) ? data.id : ''],
      fixeddetails: this.formBuilder.array([]),
    });
  }
  createFixeddetailsFormGroup(data?: any) {
    return this.formBuilder.group({
      component: [(data) ? data.component : '', [Validators.required, removeSpaces]],
      paytype: [(data) ? data.paytype : 1, [Validators.required, removeSpaces]],
      formula: [(data) ? data.formula : ''],
      calculation: [(data) ? data.calculation : ''],
      calculationdetails: this.formBuilder.array([]),
      type: [(data) ? data.type : 1],
      formula_enable: [(data) ? data.formula_enable : 1]
    });
  }
  createCalculationdetailsFormGroup(data?: any) {
    return this.formBuilder.group({
      base: [(data) ? data.base : 1],
      basetext: [(data) ? data.basetext : 1],
      typetext: [(data) ? data.typetext : 1],
      type: [(data) ? data.type : 1],
      basevalue: [(data) ? data.basevalue : 1],
      result_if_type: [(data) ? data.result_if_type : 1],
      result_if: [(data) ? data.result_if : 0],
      result_if_type_text: [(data) ? data.result_if_type_text : 0],
      result_else_type_text: [(data) ? data.result_else_type_text : 0],
      result_else_type: [(data) ? data.result_else_type : 1],
      result_else: [(data) ? data.result_else : 0]
    });
  }

  addCalculationdetailsValue(data?: any, index?:any) {
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
      if (element.invalid && element.get('type').value!==0) {
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
      id: [(data) ? data.id : ''],
      flexidetails: this.formBuilder.array([]),
    });
  }
  createFlexidetailsFormGroup(data?: any) {
    return this.formBuilder.group({
      component: [(data) ? data.component : '', [Validators.required, removeSpaces]],
      paytype: [(data) ? data.paytype : 1, [Validators.required, removeSpaces]],
      monthly_eligibility: [(data) ? data.monthly_eligibility : '', [Validators.required, removeSpaces]],
      annual_eligibility: [(data) ? data.annual_eligibility : '', [Validators.required, removeSpaces]],
      paid_monthly: [(data) ? data.paid_monthly : 1, [Validators.required, removeSpaces]],
      monthly_tax_applied: [(data) ? data.monthly_tax_applied : 1, [Validators.required, removeSpaces]],
      proofs_submitted: [(data) ? data.proofs_submitted : 1, [Validators.required, removeSpaces]],
      reimburse_proof_submission: [(data) ? data.reimburse_proof_submission : 1, [Validators.required, removeSpaces]],
      lop_dependent: [(data) ? data.lop_dependent : 1, [Validators.required, removeSpaces]],
      include_ctc: [(data) ? data.include_ctc : 1, [Validators.required, removeSpaces]],
      type: [(data) ? data.type : 1]
    });
  }
  get flexidetails(): FormArray {
    return this.flexiFormGroup.get('flexidetails') as FormArray;
  }
  addFlexidetailsValue(data?: any) {
    let invalidCount = 0;
    this.flexidetails.controls.forEach(element => {
      if (element.invalid && element.get('type').value!==0) {
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
      id: [(data) ? data.id : ''],
      variabledetails: this.formBuilder.array([]),
    });
  }
  createVariabledetailsFormGroup(data?: any) {
    return this.formBuilder.group({
      component: [(data) ? data.component : '', [Validators.required, removeSpaces]],
      paytype: [(data) ? data.paytype : 1, [Validators.required, removeSpaces]],
      base: [(data) ? data.base : '', [Validators.required, removeSpaces]],
      percentage_or_value: [(data) ? data.percentage_or_value : '', [Validators.required, removeSpaces, Validators.pattern(this.NUMBER)]],
      lop_dependent: [(data) ? data.lop_dependent : 1, [Validators.required, removeSpaces]],
      include_ctc: [(data) ? data.include_ctc : 1, [Validators.required, removeSpaces]],
      payment_frequency: [(data) ? data.payment_frequency : 1, [Validators.required, removeSpaces]],
      payment_reminder: [(data) ? data.payment_reminder : moment(), [Validators.required, removeSpaces]],
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
      if (element.invalid && element.get('type').value!==0) {
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

  initiateAdhocFormGroup(data?: any) {
    this.adhocFormGroup = this.formBuilder.group({
      id: [(data) ? data.id : ''],
      adhocdetails: this.formBuilder.array([]),
    });
  }
  createAdhocdetailsFormGroup(data?: any) {
    return this.formBuilder.group({
      component: [(data) ? data.component : '', [Validators.required, removeSpaces]],
      paytype: [(data) ? data.paytype : 1, [Validators.required, removeSpaces]],
      tax_dependent: [(data) ? data.tax_dependent : 1, [Validators.required, removeSpaces]],
      pt_dependent: [(data) ? data.pt_dependent : 1, [Validators.required, removeSpaces]],
      esi_dependent: [(data) ? data.pt_dependent : 1, [Validators.required, removeSpaces]],
      amount: [(data) ? data.amount : '', [Validators.required, removeSpaces, Validators.pattern(this.NUMBER)]],
      type: [(data) ? data.type : 1]
    });
  }
  get adhocdetails(): FormArray {
    return this.adhocFormGroup.get('adhocdetails') as FormArray;
  }
  addAdhocdetailsValue(data?: any) {
    let invalidCount = 0;
    this.adhocdetails.controls.forEach(element => {
      if (element.invalid && element.get('type').value!==0) {
        invalidCount++;
      }
    });
    if (invalidCount == 0) {
      let fg = this.createAdhocdetailsFormGroup(data);
      this.adhocdetails.push(fg);
    }
  }
  deleteAdhocdetailsValue(idx: number) {
    this.adhocdetails.removeAt(idx);
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
        { component: 'Basic', paytype: 1, type: 0, formula_enable: 1 },
        { component: 'HRA', paytype: 1, type: 0, formula_enable: 1 },
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
        { component: 'Variable Pay', paytype: 1, type: 0, payment_reminder:moment() },
        { component: 'Annual Bonus', paytype: 1, type: 0, payment_reminder:moment() },
        { component: 'Performacnce Bonus', paytype: 1, type: 0, payment_reminder:moment() }
      ],
      default_adhoc_salary_dependent: [
        { component: 'Other Earnings', paytype: 1, type: 0 },
        { component: 'Other Earnings (Non Taxable)', paytype: 1, type: 0 },
        { component: 'Other Deductions', paytype: 2, type: 0 },
        { component: 'Incentive', paytype: 2, type: 0 },
        { component: 'Salary Advance', paytype: 1, type: 0 },
        { component: 'Salary Advance Recovery', paytype: 2, type: 0 },
      ],
    };

    this.initiateFixedFormGroup();
    this.dropdown.default_fixed_salary_dependent.forEach(element => {
      this.addFixeddetailsValue(element);
    });
    this.initiateFlexiFormGroup();
    this.dropdown.default_flexi_salary_dependent.forEach(element => {
      this.addFlexidetailsValue(element);
    });
    this.initiateVariableFormGroup();
    this.dropdown.default_variable_salary_dependent.forEach(element => {
      this.addVariabledetailsValue(element);
    });
    this.initiateAdhocFormGroup();
    this.dropdown.default_adhoc_salary_dependent.forEach(element => {
      this.addAdhocdetailsValue(element);
    });
  }
  formulaChange(value: any, index: any) {
    if (value.formula !== '') {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.height = (value.formula === '1') ? '260px' : '480px';
      dialogConfig.width = '600px';
      dialogConfig.data = value;
      const dialogRef = this.matDialog.open(SubComponentComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(
        data  => {
          if (data){
            if (value.formula === '1') {
              const ctrl = this.fixedFormGroup.get('fixeddetails') as FormArray;
              let calculation = '';
              if (data.type === '1') {
                calculation = (data.basetext + ' * ' + data.basevalue + '' + data.typetext)
              } else {
                calculation = (data.basevalue)
              }
              ctrl.at(index).patchValue({ calculation: calculation});
            } else if (value.formula === '2') {
              const ctrl = this.fixedFormGroup.get('fixeddetails') as FormArray;
              let calculation = 'if '+data.basetext + '' + data.typetext + data.basevalue+' then ';
              if (data.result_if_type === '1') {
                calculation += (data.basetext + ' * ' + data.result_if + '' + data.result_if_type_text) +' else ';
              } else {
                calculation += (data.result_if) +' else ';
              }
              if (data.result_else_type === '1') {
                calculation += (data.basetext + ' * ' + data.result_else + '' + data.result_else_type_text)+' end ';
              } else {
                calculation += (data.result_else)+' end ';
              }
              ctrl.at(index).patchValue({ calculation: calculation});
            }
            this.addCalculationdetailsValue(data,index)
            console.log(this.fixedFormGroup.value);
          }
        });
    }
  }
  resetForm(){
    this.router.navigate(['/home/payroll/salary-structure']);
  }
}
