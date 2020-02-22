import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolesLayoutComponent } from './roles-layout/roles-layout.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Roles'
    },
    children: [
      {
        path: '',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: RolesLayoutComponent,
        data: {
          title: 'Roles'
        },
        children: [
          {
            path: '',
            component: ListComponent,
            data: {
              title: 'Roles List'
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
export class RolesRoutingModule { }
