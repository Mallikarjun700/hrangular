import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PayrollLayoutComponent } from './payroll-layout/payroll-layout.component';
import { SalaryStructureListComponent } from './salaryStructure/salary-structure-list/salary-structure-list.component';
import { SalaryStructureAddComponent } from './salaryStructure/salary-structure-add/salary-structure-add.component';
import { AdhocAddComponent } from './adhoc/adhoc-add/adhoc-add.component';
import { AdhocListComponent } from './adhoc/adhoc-list/adhoc-list.component';
const routes: Routes = [{
  path: '',
  data: {
    title: 'Payroll'
  },
  children: [
    {
      path: '',
      redirectTo: 'salary-structure'
    },
    {
      path: 'salary-structure',
      component: PayrollLayoutComponent,
      data: {
        title: 'Salary Structure'
      },
      children: [
        {
          path: '',
          component: SalaryStructureListComponent,
          data: {
            title: 'Salary Structure'
          }
        },
        {
          path: 'add',
          component: SalaryStructureAddComponent,
          data: {
            title: 'Add Salary Structure'
          }
        },
        {
          path: 'edit/:id',
          component: SalaryStructureAddComponent,
          data: {
            title: 'Edit Salary Structure'
          }
        }
      ]
    },
    {
      path: 'adhoc',
      component: PayrollLayoutComponent,
      data: {
        title: 'Adhoc'
      },
      children: [
        {
          path: '',
          component: AdhocListComponent,
          data: {
            title: 'Adhoc'
          }
        },
        {
          path: 'add',
          component: AdhocAddComponent,
          data: {
            title: 'Add Adhoc'
          }
        },
        {
          path: 'edit/:id',
          component: AdhocAddComponent,
          data: {
            title: 'Edit Adhoc'
          }
        }
      ]
    },
  ]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayrollRoutingModule { }
