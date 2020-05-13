import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DataTablesModule} from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MAT_LABEL_GLOBAL_OPTIONS, MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';


import { CustomizeRoutingModule } from './customize-routing.module';
import { CustomizeLayoutComponent } from './customize-layout/customize-layout.component';
import { ProfessionaltaxListComponent } from './professionaltax/professionaltax-list/professionaltax-list.component';
import { ProfessionaltaxAddComponent } from './professionaltax/professionaltax-add/professionaltax-add.component';
import { ProfessionaltaxViewComponent } from './professionaltax/professionaltax-view/professionaltax-view.component';
import { LwfListComponent } from './lwf/lwf-list/lwf-list.component';
import { LwfAddComponent } from './lwf/lwf-add/lwf-add.component';
import { LwfViewComponent } from './lwf/lwf-view/lwf-view.component';
import { EsiListComponent } from './esi/esi-list/esi-list.component';
import { EsiAddComponent } from './esi/esi-add/esi-add.component';



@NgModule({
  declarations: [CustomizeLayoutComponent, ProfessionaltaxListComponent, 
    ProfessionaltaxAddComponent, ProfessionaltaxViewComponent, 
    LwfListComponent, LwfAddComponent, LwfViewComponent, EsiListComponent, EsiAddComponent, ],
  imports: [
    CommonModule,
    CustomizeRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatDialogModule
  ],
  entryComponents: [ProfessionaltaxViewComponent, LwfViewComponent]
})
export class CustomizeModule { }
