import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { PersonalinfoComponent } from './personalinfo/personalinfo.component';
import { AddPersonalInfoComponent } from './personalinfo/add/addPersonalInfo.component';
import { PersonalinfoLayoutComponent } from './personalinfo/personalinfo-layout/personalinfo-layout.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Onboarding'
    },
    children: [
      {
        path: '',
        redirectTo: 'personalinfo'
      },
      {
        path: 'personalinfo',
        component: PersonalinfoLayoutComponent,
        data: {
          title: 'Personal Info'
        },
        children: [
          {
            path: '',
            component: PersonalinfoComponent,
            data: {
              title: 'Personal Info'
            }
          },
          {
            path: 'add',
            component: AddPersonalInfoComponent,
            data: {
              title: 'Add Profile'
            }
          },
          {
            path: 'edit/:id',
            component: AddPersonalInfoComponent,
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
export class OnboardingRoutingModule { }
