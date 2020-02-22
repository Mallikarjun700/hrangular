import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { ListComponent } from './list/list.component';
import { RolesLayoutComponent } from './roles-layout/roles-layout.component';


@NgModule({
  declarations: [ListComponent, RolesLayoutComponent],
  imports: [
    CommonModule,
    RolesRoutingModule
  ]
})
export class RolesModule { }
