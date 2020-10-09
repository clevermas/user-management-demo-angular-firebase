import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { DynamicFormComponent } from './form/dynamic-form.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    DynamicFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatIconModule,
    FlexLayoutModule
  ],
  exports: [
    DynamicFormComponent,
  ]
})
export class DynamicFormModule { }
