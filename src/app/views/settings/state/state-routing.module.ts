import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StateLayoutComponent } from './state-layout/state-layout.component';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'State'
    },
    children: [
{
        path: '',
        redirectTo: 'list'
      },      {
        path: 'list',
        component: StateLayoutComponent,
        data: {
          title: 'State'
        },
        children: [
          {
            path: '',
            component: ListComponent,
            data: {
              title: 'State List'
            }
          },
          {
            path: 'add',
            component: AddComponent,
            data: {
              title: 'State Add'
            }
          },
        	{
            path: 'edit/:id',
            component: AddComponent,
            data: {
              title: 'State Edit'
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
export class StateRoutingModule { }
