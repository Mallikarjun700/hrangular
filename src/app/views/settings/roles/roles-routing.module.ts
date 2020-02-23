import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolesLayoutComponent } from './roles-layout/roles-layout.component';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Role'
    },
    children: [
      {
        path: '',
        redirectTo: 'list'
      },      {
        path: 'list',
        component: RolesLayoutComponent,
        data: {
          title: 'Role'
        },
        children: [
          {
            path: '',
            component: ListComponent,
            data: {
              title: 'Role List'
            }
          },
          {
            path: 'add',
            component: AddComponent,
            data: {
              title: 'Role Add'
            }
          },
	        {
            path: 'edit/:id',
            component: AddComponent,
            data: {
              title: 'Role Edit'
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
