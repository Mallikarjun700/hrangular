import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyeventLayoutComponent } from './companyevent-layout/companyevent-layout.component';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Company Events'
    },
    children: [
{
        path: '',
        redirectTo: 'list'
      },      {
        path: 'list',
        component: CompanyeventLayoutComponent,
        data: {
          title: 'Company Events'
        },
        children: [
          {
            path: '',
            component: ListComponent,
            data: {
              title: 'Company Events List'
            }
          },
          {
            path: 'add',
            component: AddComponent,
            data: {
              title: 'Company Events Add'
            }
          },
	        {
            path: 'edit/:id',
            component: AddComponent,
            data: {
              title: 'Company Events Edit'
            }
          }
        ]
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyeventRoutingModule { }
