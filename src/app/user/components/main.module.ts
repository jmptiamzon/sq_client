import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { UserModule } from '../user.module';
import { HomeModule } from './home/home.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    UserModule,
  ],
  exports: [
    HomeModule,
  ]
})
export class MainModule { }
