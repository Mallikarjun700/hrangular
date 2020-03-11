import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { CompanyprofileComponent } from './companyprofile/companyprofile.component';
import { AddCompanyProfileComponent } from './companyprofile/add/addCompanyProfile.component';
import { CompanyprofileLayoutComponent } from './companyprofile/companyprofile-layout/companyprofile-layout.component';
import { ControlpanelComponent } from './controlpanel/controlpanel.component';
import { CalenderComponent } from './calender/calender.component';
import { MasterComponent } from './master/master.component';

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
        path: 'controlpanel',
        component: ControlpanelComponent,
        data: {
          title: 'Control Panel'
        },
        children: [
          {
            path: 'organization',
            component: ControlpanelComponent,
            data: {
              title: 'Control Panel'
            }
          }
        ]

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
            component: AddCompanyProfileComponent,
            data: {
              title: 'Add Company Profile'
            }
          },
          {
            path: 'edit/:id',
            component: AddCompanyProfileComponent,
            data: {
              title: 'Edit Company Profile'
            }
          }
        ]
      },
      {
        path: 'calender',
        component: CompanyprofileLayoutComponent,
        data: {
          title: 'Calendar'
        },
        children: [
          {
            path: '',
            component: CalenderComponent,
            data: {
              title: 'Calendar'
            }
          },
        ]
      },
      {
        path: 'master',
        component: CompanyprofileLayoutComponent,
        data: {
          title: 'Master'
        },
        children: [
          {
            path: '',
            component: MasterComponent,
            data: {
              title: 'Master'
            }
          },
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
