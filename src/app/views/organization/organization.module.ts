import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_LABEL_GLOBAL_OPTIONS, MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';

import { FullCalendarModule } from '@fullcalendar/angular'; // for FullCalendar!
import { MatDialogModule } from '@angular/material/dialog';
import { AngularEditorModule } from '@kolkov/angular-editor';


// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';
// Import routing module
import { OrganizationRoutingModule } from './organization-routing.module';
import { CompanyprofileLayoutComponent } from './companyprofile/companyprofile-layout/companyprofile-layout.component';
import { CompanyprofileComponent } from './companyprofile/companyprofile.component';
import { AddCompanyProfileComponent } from './companyprofile/add/addCompanyProfile.component';
import { ControlpanelComponent } from './controlpanel/controlpanel.component';
import { CalenderComponent } from './calender/calender.component';
import { AddeventComponent } from './calender/addevent/addevent.component';
import { MasterComponent } from './master/master.component';

@NgModule({
  declarations: [
    CompanyprofileComponent,
    CompanyprofileLayoutComponent,
    AddCompanyProfileComponent,
    ControlpanelComponent,
    CalenderComponent,
    AddeventComponent,
    MasterComponent
  ],
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
    MatStepperModule,
    FullCalendarModule,
    MatDialogModule,
    MatIconModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatChipsModule,
    AngularEditorModule
  ],
  providers: [DatePipe]

})
export class OrganizationModule { }
