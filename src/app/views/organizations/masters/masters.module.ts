import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MastersRoutingModule } from './masters-routing.module';
import { MastersLayoutComponent } from './masters-layout/masters-layout.component';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [MastersLayoutComponent, ListComponent],
  imports: [
    CommonModule,
    MastersRoutingModule
  ]
})
export class MastersModule { }
