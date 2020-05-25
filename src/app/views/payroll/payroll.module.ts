import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTabsModule } from '@angular/material/tabs';
import { MAT_LABEL_GLOBAL_OPTIONS, MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


import { PayrollRoutingModule } from './payroll-routing.module';
import { PayrollLayoutComponent } from './payroll-layout/payroll-layout.component';
import { SalaryStructureListComponent } from './salaryStructure/salary-structure-list/salary-structure-list.component';
import { SalaryStructureAddComponent } from './salaryStructure/salary-structure-add/salary-structure-add.component';
import { SubComponentComponent } from './salaryStructure/salary-structure-add/sub-component/sub-component.component';
import { AdhocListComponent } from './adhoc/adhoc-list/adhoc-list.component';
import { AdhocAddComponent } from './adhoc/adhoc-add/adhoc-add.component';


@NgModule({
  declarations: [PayrollLayoutComponent, SalaryStructureListComponent, SalaryStructureAddComponent, SubComponentComponent, AdhocListComponent, AdhocAddComponent],
  imports: [
    CommonModule,
    PayrollRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatDialogModule,
    MatSlideToggleModule
  ],
  entryComponents: [SubComponentComponent]
})
export class PayrollModule { }
