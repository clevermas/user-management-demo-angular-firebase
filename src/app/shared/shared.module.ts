import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DynamicFormModule } from '@shared/dynamic-form/dynamic-form.module';


@NgModule({
  declarations: [SpinnerComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    DynamicFormModule
  ],
  exports: [
    SpinnerComponent,
    DynamicFormModule
  ]
})
export class SharedModule {
}
