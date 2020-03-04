import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DataTablesModule} from 'angular-datatables';
// import { FormsModule } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from  '@angular/material/form-field';
import {MatInputModule} from  '@angular/material/input';
import {MatButtonModule} from  '@angular/material/button';
import {MatStepperModule} from '@angular/material/stepper';
// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';
// Import routing module
import { CompanyprofileRoutingModule } from './companyprofile-routing.module';
import { CompanyprofileLayoutComponent } from './companyprofile-layout/companyprofile-layout.component';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
@NgModule({
  declarations: [ListComponent,CompanyprofileLayoutComponent, AddComponent],
  imports: [
    CommonModule,
    CompanyprofileRoutingModule,
    TabsModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatStepperModule

]
})
export class OrganizationModule { }
