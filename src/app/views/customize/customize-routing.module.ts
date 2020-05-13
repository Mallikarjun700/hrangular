import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomizeLayoutComponent } from './customize-layout/customize-layout.component';
import { ProfessionaltaxListComponent } from './professionaltax/professionaltax-list/professionaltax-list.component';
import { ProfessionaltaxAddComponent } from './professionaltax/professionaltax-add/professionaltax-add.component';
import { LwfListComponent } from './lwf/lwf-list/lwf-list.component';
import { LwfAddComponent } from './lwf/lwf-add/lwf-add.component';
import { ProvidentfundAddComponent } from './providentfund/providentfund-add/providentfund-add.component';
import { ProvidentfundListComponent } from './providentfund/providentfund-list/providentfund-list.component';

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
    {
      path: 'lwf',
      component: CustomizeLayoutComponent,
      data: {
        title: 'LWF'
      },
      children: [
        {
          path: '',
          component: LwfListComponent,
          data: {
            title: 'LWF'
          }
        },
        {
          path: 'add',
          component: LwfAddComponent,
          data: {
            title: 'Add LWF'
          }
        },
        {
          path: 'edit/:id',
          component: LwfAddComponent,
          data: {
            title: 'Edit LWF'
          }
        }
      ]
    },
    {
      path: 'providentfund',
      component: CustomizeLayoutComponent,
      data: {
        title: 'Provident Fund'
      },
      children: [
        {
          path: '',
          component: ProvidentfundListComponent,
          data: {
            title: 'Provident Fund'
          }
        },
        {
          path: 'add',
          component: ProvidentfundAddComponent,
          data: {
            title: 'Add Provident Fund'
          }
        },
        {
          path: 'edit/:id',
          component: ProvidentfundAddComponent,
          data: {
            title: 'Edit Provident Fund'
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
