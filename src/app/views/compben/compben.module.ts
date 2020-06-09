import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTabsModule } from '@angular/material/tabs';
import { MAT_LABEL_GLOBAL_OPTIONS, MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


import { CompbenRoutingModule } from './compben-routing.module';
import { CompbenLayoutComponent } from './compben-layout/compben-layout.component';
import { ItDeclarationComponent } from './it-declaration/it-declaration.component';
import { SubComponentComponent } from './it-declaration/sub-component/sub-component.component';
import { InvestmenttypeListComponent } from './investmenttype/investmenttype-list/investmenttype-list.component';
import { InvestmenttypeAddComponent } from './investmenttype/investmenttype-add/investmenttype-add.component';


@NgModule({
  declarations: [CompbenLayoutComponent, ItDeclarationComponent, SubComponentComponent, InvestmenttypeListComponent, InvestmenttypeAddComponent],
  imports: [
    CommonModule,
    CompbenRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatDialogModule,
    MatSlideToggleModule
  ],
  entryComponents: [SubComponentComponent]
})
export class CompbenModule { }
