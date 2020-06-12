import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DataTablesModule} from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from  '@angular/material/form-field';
import {MatInputModule} from  '@angular/material/input';
import {MatButtonModule} from  '@angular/material/button';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MAT_LABEL_GLOBAL_OPTIONS, MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import { FileUploadModule } from '@iplab/ngx-file-upload';
// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';
// Import routing module
import { OnboardingRoutingModule } from './onboarding-routing.module';
import { PersonalinfoLayoutComponent } from './personalinfo/personalinfo-layout/personalinfo-layout.component';
import { PersonalinfoComponent } from './personalinfo/personalinfo.component';
import { AddPersonalInfoComponent } from './personalinfo/add/addPersonalInfo.component';

import { UploadboxComponent } from '../../_shared/uploadBox/uploadBox.component';

@NgModule({
  declarations: [PersonalinfoComponent,PersonalinfoLayoutComponent, AddPersonalInfoComponent,UploadboxComponent],
  imports: [
    CommonModule,
	  OnboardingRoutingModule,
    TabsModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatDialogModule,
    FileUploadModule
  ],
  entryComponents: [UploadboxComponent]
})
export class OnboardingModule { }
