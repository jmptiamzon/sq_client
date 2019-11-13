import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { MainComponent } from './main.component';
import { AboutModule } from './about/about.module';
import { AssessmentComponent } from './assessment/assessment.component';
import { FeatureComponent } from './feature/feature.component';
import { AssessmentModule } from './assessment/assessment.module';
import { FeatureModule } from './feature/feature.module';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { SurveyComponent } from './survey/survey.component';
import { SurveyModule } from './survey/survey.module';

@NgModule({
  declarations: [
    MainComponent,
    MaintenanceComponent,
  ],
  imports: [
    CommonModule,
    HomeModule,
    AboutModule,
    AssessmentModule,
    FeatureModule,
    SurveyModule,
  ],
  exports: [
    HomeModule,
    AboutModule,
    AssessmentModule,
    FeatureModule,
    SurveyModule,
  ]
})
export class MainModule { }
