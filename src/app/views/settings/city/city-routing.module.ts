import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CityLayoutComponent } from './city-layout/city-layout.component';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'City'
    },
    children: [
      {
        path: '',
        redirectTo: 'list'
      }, {
        path: 'list',
        component: CityLayoutComponent,
        data: {
          title: 'City'
        },
        children: [
          {
            path: '',
            component: ListComponent,
            data: {
              title: 'City List'
            }
          },
          {
            path: 'add',
            component: AddComponent,
            data: {
              title: 'City Add'
            }
          },
          {
            path: 'edit/:id',
            component: AddComponent,
            data: {
              title: 'City Edit'
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
export class CityRoutingModule { }
