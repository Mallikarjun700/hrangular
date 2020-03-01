import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { PersonalinfoComponent } from './personalinfo/personalinfo.component';
import { AddComponent } from './personalinfo/add/add.component';
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
            component: AddComponent,
            data: {
              title: 'Add Profile'
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
export class OnboardingRoutingModule { }
