import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { CompanyprofileComponent } from './companyprofile/companyprofile.component';
import { AddComponent } from './companyprofile/add/add.component';
import { CompanyprofileLayoutComponent } from './companyprofile/companyprofile-layout/companyprofile-layout.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Organization'
    },
    children: [
      {
        path: '',
        redirectTo: 'companyprofile'
      },
      {
        path: 'companyprofile',
        component: CompanyprofileLayoutComponent,
        data: {
          title: 'Company Profile'
        },
        children: [
          {
            path: '',
            component: CompanyprofileComponent,
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
export class OrganizationRoutingModule { }
