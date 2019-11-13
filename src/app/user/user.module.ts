import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { HomeModule } from './components/home/home.module';
import { UserComponent } from './user.component';
import { AboutModule } from './components/about/about.module';
import { AssessmentModule } from './components/assessment/assessment.module';
import { FeatureModule } from './components/feature/feature.module';
import { RouterModule } from '@angular/router';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';
import { SurveyModule } from './components/survey/survey.module';

@NgModule({
  declarations: [
    UserComponent,
    MaintenanceComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    RouterModule,
    HomeModule,
    AboutModule,
    AssessmentModule,
    FeatureModule,
    SurveyModule,
  ]
})
export class UserModule { }
