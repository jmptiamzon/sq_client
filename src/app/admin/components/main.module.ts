import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModule } from './login/login.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { UsersModule } from './users/users.module';
import { AccountModule } from './account/account.module';
import { ConfigModule } from './config/config.module';
import { CourseModule } from './course/course.module';
import { HelpModule } from './help/help.module';
import { QuestionModule } from './question/question.module';
import { SchoolModule } from './school/school.module';
import { TreeModule } from './tree/tree.module';
import { MainComponent } from './main.component';
import { UsertblComponent } from './tables/usertbl/usertbl.component';
import { UserlogComponent } from './tables/userlog/userlog.component';
import { AreaModule } from './area/area.module';

@NgModule({
  declarations: [
    MainComponent,
    UsertblComponent,
    UserlogComponent,
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
    AreaModule,
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
    AreaModule,
  ],
})
export class MainModule { }
