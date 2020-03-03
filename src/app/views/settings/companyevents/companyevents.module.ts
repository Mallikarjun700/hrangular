import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {DataTablesModule} from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from  '@angular/material/form-field';
import {MatInputModule} from  '@angular/material/input';
import {MatButtonModule} from  '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'; 
import { CompanyeventsRoutingModule } from './companyevents-routing.module';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { CompanyeventsLayoutComponent } from './companyevents-layout/companyevents-layout.component';


@NgModule({
  declarations: [AddComponent, ListComponent, CompanyeventsLayoutComponent],
  imports: [
    CommonModule,
    CompanyeventsRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule
  ]
})
export class CompanyeventsModule { }
