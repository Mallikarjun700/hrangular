import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SystemsettingsComponent} from './systemsettings.component';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'System Settings'
    },
    children: [
      {
        path: '',
        redirectTo: 'mapping'
      }, 
      {
        path: 'mapping',
        component: SystemsettingsComponent,
        data: {
          title: 'Mapping'
        },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemsettingsRoutingModule { }
