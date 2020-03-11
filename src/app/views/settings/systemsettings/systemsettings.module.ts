import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from  '@angular/material/form-field';
import {MatInputModule} from  '@angular/material/input';
import {MatButtonModule} from  '@angular/material/button';

import { SystemsettingsRoutingModule } from './systemsettings-routing.module';
import {SystemsettingsComponent} from './systemsettings.component';

@NgModule({
  declarations: [SystemsettingsComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    SystemsettingsRoutingModule
  ]
})
export class SystemsettingsModule { }
