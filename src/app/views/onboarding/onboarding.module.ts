import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DataTablesModule} from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from  '@angular/material/form-field';
import {MatInputModule} from  '@angular/material/input';
import {MatButtonModule} from  '@angular/material/button';
import {MatStepperModule} from '@angular/material/stepper';
// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';
// Import routing module
import { OnboardingRoutingModule } from './onboarding-routing.module';
import { PersonalinfoLayoutComponent } from './personalinfo/personalinfo-layout/personalinfo-layout.component';
import { PersonalinfoComponent } from './personalinfo/personalinfo.component';
import { AddComponent } from './personalinfo/add/add.component';



@NgModule({
  declarations: [PersonalinfoComponent,PersonalinfoLayoutComponent, AddComponent],
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
    MatStepperModule
  ]
})
export class OnboardingModule { }
