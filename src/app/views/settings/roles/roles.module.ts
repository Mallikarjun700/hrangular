import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {DataTablesModule} from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from  '@angular/material/form-field';
import {MatInputModule} from  '@angular/material/input';
import {MatButtonModule} from  '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'; 

import { RolesRoutingModule } from './roles-routing.module';
import { ListComponent } from './list/list.component';
import { RolesLayoutComponent } from './roles-layout/roles-layout.component';
import { AddComponent } from './add/add.component';


@NgModule({
  declarations: [ListComponent, RolesLayoutComponent, AddComponent],
  imports: [
    CommonModule,
    RolesRoutingModule,
    DataTablesModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule
  ]
})
export class RolesModule { }
