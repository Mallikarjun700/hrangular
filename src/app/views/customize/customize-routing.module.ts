import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomizeLayoutComponent } from './customize-layout/customize-layout.component';
import { ProfessionaltaxListComponent } from './professionaltax/professionaltax-list/professionaltax-list.component';
import { ProfessionaltaxAddComponent } from './professionaltax/professionaltax-add/professionaltax-add.component';


const routes: Routes = [{
  path: '',
  data: {
    title: 'Customize'
  },
  children: [
    {
      path: '',
      redirectTo: 'professionaltax'
    },
    {
      path: 'professionaltax',
      component: CustomizeLayoutComponent,
      data: {
        title: 'ProfessionalTax'
      },
      children: [
        {
          path: '',
          component: ProfessionaltaxListComponent,
          data: {
            title: 'Professional Tax'
          }
        },
        {
          path: 'add',
          component: ProfessionaltaxAddComponent,
          data: {
            title: 'Add Professional Tax'
          }
        },
        {
          path: 'edit/:id',
          component: ProfessionaltaxAddComponent,
          data: {
            title: 'Edit Professional Tax'
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
export class CustomizeRoutingModule { }
