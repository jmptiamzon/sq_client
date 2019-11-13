import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { SchoolComponent } from './components/school/school.component';
import { CourseComponent } from './components/course/course.component';
import { QuestionComponent } from './components/question/question.component';
import { ConfigComponent } from './components/config/config.component';
import { HelpComponent } from './components/help/help.component';
import { TreeComponent } from './components/tree/tree.component';
import { AccountComponent } from './components/account/account.component';
import { AuthGuardService } from './components/services/auth-guard.service';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
      { path: 'users', component: UsersComponent, canActivate: [AuthGuardService] },
      { path: 'school', component: SchoolComponent, canActivate: [AuthGuardService] },
      { path: 'course', component: CourseComponent, canActivate: [AuthGuardService] },
      { path: 'question', component: QuestionComponent, canActivate: [AuthGuardService] },
      { path: 'config', component: ConfigComponent, canActivate: [AuthGuardService] },
      { path: 'help', component: HelpComponent, canActivate: [AuthGuardService] },
      { path: 'account', component: AccountComponent, canActivate: [AuthGuardService] },
      { path: 'tree', component: TreeComponent, canActivate: [AuthGuardService] },
      { path: '**', pathMatch: 'full', redirectTo: 'admin/dashboard' },
    ],
  },

  { path: 'admin/login', component: LoginComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AdminRoutingModule { }
