import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { CompanyprofileLayoutComponent } from './companyprofile-layout/companyprofile-layout.component';
import { AddComponent } from './add/add.component';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Organizations'
    },
    children: [
      {
        path: '',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: CompanyprofileLayoutComponent,
        data: {
          title: 'Company Profile'
        },
        children: [
          {
            path: '',
            component: ListComponent,
            data: {
              title: 'Company Profile'
            }
          },
          {
            path: 'add',
            component: AddComponent,
            data: {
              title: 'Add Company Profile'
            }
          },
          {
            path: 'edit/:id',
            component: AddComponent,
            data: {
              title: 'Edit Company Profile'
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
export class CompanyprofileRoutingModule { }
