import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { LoginModule } from './components/login/login.module';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { UsersModule } from './components/users/users.module';
import { MatMenuModule } from '@angular/material/menu';
import { AccountModule } from './components/account/account.module';
import { ConfigModule } from './components/config/config.module';
import { CourseModule } from './components/course/course.module';
import { HelpModule } from './components/help/help.module';
import { QuestionModule } from './components/question/question.module';
import { SchoolModule } from './components/school/school.module';
import { AddAdminComponent } from './components/modals/add-admin/add-admin.component';
import { EditAdminComponent } from './components/modals/edit-admin/edit-admin.component';
import { AddSchoolComponent } from './components/modals/add-school/add-school.component';
import { EditSchoolComponent } from './components/modals/edit-school/edit-school.component';
import { AddCourseComponent } from './components/modals/add-course/add-course.component';
import { EditCourseComponent } from './components/modals/edit-course/edit-course.component';
import { AddQuestionComponent } from './components/modals/add-question/add-question.component';
import { EditQuestionComponent } from './components/modals/edit-question/edit-question.component';
import { TreeModule } from './components/tree/tree.module';
import { AddQuestionTreeComponent } from './components/modals/add-question-tree/add-question-tree.component';
import { AddMultipleComponent } from './components/modals/add-multiple/add-multiple.component';
import { ChooseSchoolComponent } from './components/modals/choose-school/choose-school.component';
import { AreaModule } from './components/area/area.module';
import { EditAreaComponent } from './components/modals/edit-area/edit-area.component';
import { AddAreaComponent } from './components/modals/add-area/add-area.component';


@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    LoginModule,
    DashboardModule,
    UsersModule,
    AccountModule,
    ConfigModule,
    CourseModule,
    HelpModule,
    QuestionModule,
    SchoolModule,
    TreeModule,
    AreaModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    MatMenuModule,
  ],
  exports: [
  ],
  entryComponents: [
    AddAdminComponent,
    EditAdminComponent,
    AddSchoolComponent,
    EditSchoolComponent,
    AddCourseComponent,
    EditCourseComponent,
    AddQuestionComponent,
    EditQuestionComponent,
    AddQuestionTreeComponent,
    AddMultipleComponent,
    ChooseSchoolComponent,
    AddAreaComponent,
    EditAreaComponent,
  ]
})
export class AdminModule { }
