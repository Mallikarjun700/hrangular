import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import { MastersLayoutComponent } from './masters-layout/masters-layout.component';
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
        component: MastersLayoutComponent,
        data: {
          title: 'Masters'
        },
        children: [
          {
            path: '',
            component: ListComponent,
            data: {
              title: 'Masters'
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
export class MastersRoutingModule { }
