import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PayrollLayoutComponent } from './payroll-layout/payroll-layout.component';
import { SalaryStructureListComponent } from './salaryStructure/salary-structure-list/salary-structure-list.component';
import { SalaryStructureAddComponent } from './salaryStructure/salary-structure-add/salary-structure-add.component';

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
  ]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayrollRoutingModule { }
