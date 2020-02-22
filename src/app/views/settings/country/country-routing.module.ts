import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountryLayoutComponent } from './country-layout/country-layout.component';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Country'
    },
    children: [
{
        path: '',
        redirectTo: 'list'
      },      {
        path: 'list',
        component: CountryLayoutComponent,
        data: {
          title: 'Country'
        },
        children: [
          {
            path: '',
            component: ListComponent,
            data: {
              title: 'Country List'
            }
          },
          {
            path: 'add',
            component: AddComponent,
            data: {
              title: 'Country Add'
            }
          },
	{
            path: 'edit/:id',
            component: AddComponent,
            data: {
              title: 'Country Edit'
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
export class CountryRoutingModule { }