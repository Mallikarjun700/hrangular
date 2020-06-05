import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompbenLayoutComponent } from './compben-layout/compben-layout.component';
import { ItDeclarationComponent } from './it-declaration/it-declaration.component';

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
  ]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompbenRoutingModule { }
