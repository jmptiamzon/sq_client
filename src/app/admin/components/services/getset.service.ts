import { Injectable, OnDestroy } from '@angular/core';
import { BackendService } from './backend.service';
import { Subject } from 'rxjs';
import { Admin } from '../users/users.component';
import { School } from '../school/school.component';
import { Course } from '../course/course.component';
import { SchoolModal } from '../modals/add-course/add-course.component';
import { Log } from '../dashboard/dashboard.component';
import { Question, CourseQ } from '../question/question.component';
import { CourseModal } from '../modals/add-question/add-question.component';
import { CourseEditModal } from '../modals/edit-question/edit-question.component';

@Injectable({
  providedIn: 'root'
})
export class GetsetService implements OnDestroy {
  querySubscription;
  error = false;
  errorMessage = '';
  dataLoading = false;
  adminData: any[];
  schoolData: any[];
  courseData: any[];
  questionData: any[];
  appTitle = 'Dashboard';
  changeTableValueLog: Subject<Log> = new Subject<Log>();
  changeTableValue: Subject<Admin> = new Subject<Admin>();
  changeTableValueSchool: Subject<School> = new Subject<School>();
  changeTableValueSchoolModal: Subject<SchoolModal> = new Subject<SchoolModal>();
  changeTableValueCourse: Subject<Course> = new Subject<Course>();
  changeTableValueCourseModal: Subject<CourseModal> = new Subject<CourseModal>();
  changeTableValueCourseEditModal: Subject<CourseEditModal> = new Subject<CourseEditModal>();
  changeTableValueQuestion: Subject<Question> = new Subject<Question>();
  changeTableValueQuestionCourse: Subject<CourseQ> = new Subject<CourseQ>();

  constructor(
    private backendService: BackendService,
  ) { }

  // Admin
  getUserLogs() {
    this.querySubscription = this.backendService.getUserLogs().subscribe((res) => {
      this.changeTableValueLog.next(res);
    });
  }

  getData() {
    this.querySubscription = this.backendService.getData().subscribe((res) => {
      this.changeTableValue.next(res);
    });
  }

  getDataSchool() {
    this.querySubscription = this.backendService.getDataSchool().subscribe((res) => {
      this.changeTableValueSchool.next(res);
    });
  }

  getDataSchoolModal() {
    this.querySubscription = this.backendService.getDataSchoolModal().subscribe((res) => {
      this.changeTableValueSchoolModal.next(res);
    });
  }

  getDataCourse() {
    this.querySubscription = this.backendService.getDataCourse().subscribe((res) => {
      this.changeTableValueCourse.next(res);
    });
  }

  getDataCourseModal() {
    this.querySubscription = this.backendService.getDataCourseModal().subscribe((res) => {
      this.changeTableValueCourseModal.next(res);
    });
  }

  getDataQuestionCourse() {
    this.querySubscription = this.backendService.getDataQuestionCourse().subscribe((res) => {
      this.changeTableValueQuestionCourse.next(res);
    });
  }

  getDataQuestion() {
    this.querySubscription = this.backendService.getDataQuestion().subscribe((res) => {
      this.changeTableValueQuestion.next(res);
    });
  }

  updateLogs(cond: number, update: number) {
    this.querySubscription = this.backendService.updateLogs(cond, update).subscribe((res) => {

    });
  }

  addLinearTree(sid: number, qid: number) {
    const jsonVal = {schoolId: sid, questionId: qid};
    this.querySubscription = this.backendService.addLinearTree(jsonVal).subscribe((res) => {

    });
  }

  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }
}
