import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {DataTablesModule} from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from  '@angular/material/form-field';
import {MatInputModule} from  '@angular/material/input';
import {MatButtonModule} from  '@angular/material/button';

import { CityRoutingModule } from './city-routing.module';
import { CityLayoutComponent } from './city-layout/city-layout.component';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [CityLayoutComponent, AddComponent, ListComponent],
  imports: [
    CommonModule,
    CityRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class CityModule { }
