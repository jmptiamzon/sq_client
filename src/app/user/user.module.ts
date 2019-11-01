import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { HomeModule } from './components/home/home.module';
import { UserComponent } from './user.component';
import { NavbarModule, WavesModule, ButtonsModule, IconsModule } from 'angular-bootstrap-md';
import { DropdownModule } from 'angular-bootstrap-md';

@NgModule({
  declarations: [
    UserComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    HomeModule,
    NavbarModule,
    WavesModule,
    ButtonsModule,
    IconsModule,
    DropdownModule.forRoot(),
  ]
})
export class UserModule { }
