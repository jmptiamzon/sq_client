import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { HomeModule } from './components/home/home.module';
import { UserComponent } from './user.component';
import { AboutModule } from './components/about/about.module';
import { AssessmentModule } from './components/assessment/assessment.module';
import { FeatureModule } from './components/feature/feature.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    UserComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    RouterModule,
    HomeModule,
    AboutModule,
    AssessmentModule,
    FeatureModule,
  ]
})
export class UserModule { }
