import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AssessmentComponent } from './assessment.component';

@NgModule({
  declarations: [
    AssessmentComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
  ],
  exports: [
    AssessmentComponent,
  ]
})
export class AssessmentModule { }
