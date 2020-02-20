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
import { OrganizationRoutingModule } from './organization-routing.module';
import { CompanyprofileLayoutComponent } from './companyprofile/companyprofile-layout/companyprofile-layout.component';
import { CompanyprofileComponent } from './companyprofile/companyprofile.component';
import { AddComponent } from './companyprofile/add/add.component';

@NgModule({
  declarations: [CompanyprofileComponent,CompanyprofileLayoutComponent, AddComponent],
  imports: [
    CommonModule,
    OrganizationRoutingModule,
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
