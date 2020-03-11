import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {DataTablesModule} from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from  '@angular/material/form-field';
import {MatInputModule} from  '@angular/material/input';
import {MatButtonModule} from  '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'; 

import { CompanyeventRoutingModule } from './companyevent-routing.module';
import { CompanyeventLayoutComponent } from './companyevent-layout/companyevent-layout.component';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [CompanyeventLayoutComponent, AddComponent, ListComponent],
  imports: [
    CommonModule,
    CompanyeventRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule
  ]
})
export class CompanyeventModule { }
