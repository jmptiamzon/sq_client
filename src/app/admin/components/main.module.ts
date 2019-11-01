import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main.component';
import { LoginModule } from './login/login.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { UsersComponent } from './users/users.component';
import { UsersModule } from './users/users.module';
import { SchoolComponent } from './school/school.component';
import { CourseComponent } from './course/course.component';
import { QuestionComponent } from './question/question.component';
import { ConfigComponent } from './config/config.component';
import { HelpComponent } from './help/help.component';
import { AccountComponent } from './account/account.component';
import { TreeComponent } from './tree/tree.component';
import { AccountModule } from './account/account.module';
import { ConfigModule } from './config/config.module';
import { CourseModule } from './course/course.module';
import { HelpModule } from './help/help.module';
import { QuestionModule } from './question/question.module';
import { SchoolModule } from './school/school.module';
import { TreeModule } from './tree/tree.module';
import { AddAdminComponent } from './modals/add-admin/add-admin.component';
import { EditAdminComponent } from './modals/edit-admin/edit-admin.component';
import { AddSchoolComponent } from './modals/add-school/add-school.component';
import { EditSchoolComponent } from './modals/edit-school/edit-school.component';
import { AddCourseComponent } from './modals/add-course/add-course.component';
import { EditCourseComponent } from './modals/edit-course/edit-course.component';
import { AddQuestionComponent } from './modals/add-question/add-question.component';
import { EditQuestionComponent } from './modals/edit-question/edit-question.component';
import { AddQuestionTreeComponent } from './modals/add-question-tree/add-question-tree.component';
import { AddMultipleComponent } from './modals/add-multiple/add-multiple.component';
import { ChooseSchoolComponent } from './modals/choose-school/choose-school.component';

@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent,
    MainComponent,
    UsersComponent,
    SchoolComponent,
    CourseComponent,
    QuestionComponent,
    ConfigComponent,
    HelpComponent,
    AccountComponent,
    TreeComponent,
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
  ],
  imports: [
    CommonModule,
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
  ],
  exports: [
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
  ],
})
export class MainModule { }
