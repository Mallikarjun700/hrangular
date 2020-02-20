import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {DataTablesModule} from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from  '@angular/material/form-field';
import {MatInputModule} from  '@angular/material/input';
import {MatButtonModule} from  '@angular/material/button';

import { StateRoutingModule } from './state-routing.module';
import { StateLayoutComponent } from './state-layout/state-layout.component';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [StateLayoutComponent, AddComponent, ListComponent],
  imports: [
    CommonModule,
    StateRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class StateModule { }
