import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompbenLayoutComponent } from './compben-layout/compben-layout.component';
import { ItDeclarationComponent } from './it-declaration/it-declaration.component';
import { InvestmenttypeListComponent } from './investmenttype/investmenttype-list/investmenttype-list.component';
import { InvestmenttypeAddComponent } from './investmenttype/investmenttype-add/investmenttype-add.component'
const routes: Routes = [{
  path: '',
  data: {
    title: 'Compben'
  },
  children: [
    {
      path: '',
      redirectTo: 'it-declaration'
    },
    {
      path: 'it-declaration',
      component: CompbenLayoutComponent,
      data: {
        title: 'IT Declaration'
      },
      children: [
        {
          path: '',
          component: ItDeclarationComponent,
          data: {
            title: 'IT Declaration'
          }
        },
      ]
    },
    {
      path: 'investmenttype',
      component: CompbenLayoutComponent,
      data: {
        title: 'Investment Type'
      },
      children: [
        {
          path: '',
          component: InvestmenttypeListComponent,
          data: {
            title: 'Investment Type'
          }
        },
        {
          path: 'add',
          component: InvestmenttypeAddComponent,
          data: {
            title: 'Investment Type Add'
          }
        },
        {
          path: 'edit/:id',
          component: InvestmenttypeAddComponent,
          data: {
            title: 'Investment Type Edit'
          }
        }
      ]
    },
  ]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompbenRoutingModule { }
