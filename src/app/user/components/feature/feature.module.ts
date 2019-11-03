import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { FeatureComponent } from './feature.component';

@NgModule({
  declarations: [
    FeatureComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
  ],
  exports: [
    FeatureComponent,
  ]
})
export class FeatureModule { }
