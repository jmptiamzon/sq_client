import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CarouselModule, WavesModule } from 'angular-bootstrap-md';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    WavesModule,
    CarouselModule,
  ],
  exports: [
    HomeComponent,
  ],
})
export class HomeModule { }
