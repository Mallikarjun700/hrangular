import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomizeLayoutComponent } from './customize-layout/customize-layout.component';
import { ProfessionaltaxListComponent } from './professionaltax/professionaltax-list/professionaltax-list.component';
import { ProfessionaltaxAddComponent } from './professionaltax/professionaltax-add/professionaltax-add.component';
import { LwfListComponent } from './lwf/lwf-list/lwf-list.component';
import { LwfAddComponent } from './lwf/lwf-add/lwf-add.component';
import { EsiListComponent } from './esi/esi-list/esi-list.component';
import { EsiAddComponent } from './esi/esi-add/esi-add.component';

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
      path: 'esi',
      component: CustomizeLayoutComponent,
      data: {
        title: 'ESI'
      },
      children: [
        {
          path: '',
          component: EsiListComponent,
          data: {
            title: 'ESI'
          }
        },
        {
          path: 'add',
          component: EsiAddComponent,
          data: {
            title: 'Add ESI'
          }
        },
        {
          path: 'edit/:id',
          component: EsiAddComponent,
          data: {
            title: 'Edit ESI'
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
