import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {DataTablesModule} from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from  '@angular/material/form-field';
import {MatInputModule} from  '@angular/material/input';
import {MatButtonModule} from  '@angular/material/button';

import { CountryRoutingModule } from './country-routing.module';
import { CountryLayoutComponent } from './country-layout/country-layout.component';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';


@NgModule({
  declarations: [CountryLayoutComponent, ListComponent, AddComponent],
  imports: [
    CommonModule,
    CountryRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class CountryModule { }
