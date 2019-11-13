import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { HomeComponent } from './components/home/home.component';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './components/about/about.component';
import { FeatureComponent } from './components/feature/feature.component';
import { AssessmentComponent } from './components/assessment/assessment.component';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';
import { SurveyComponent } from './components/survey/survey.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'feature', component: FeatureComponent },
      { path: 'assessment', component: AssessmentComponent },
      { path: 'survey/:user', component: SurveyComponent },
      { path: '**', pathMatch: 'full', component: HomeComponent },
    ]
  },

  { path: 'maintenance', component: MaintenanceComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class UserRoutingModule { }
