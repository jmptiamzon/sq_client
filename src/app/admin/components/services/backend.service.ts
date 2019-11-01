import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Admin } from '../users/users.component';
import { School } from '../school/school.component';
import { Course } from '../course/course.component';
import { SchoolModal } from '../modals/add-course/add-course.component';
import { Log } from '../dashboard/dashboard.component';
import { Question, CourseQ } from '../question/question.component';
import { CourseModal } from '../modals/add-question/add-question.component';
import { CourseEditModal } from '../modals/edit-question/edit-question.component';
import { CourseTree, QuestionTree, SchoolTreeParent } from '../tree/tree.component';
import { AddQuestionTree, AddCourseTree, AddSchoolTree } from '../modals/add-question-tree/add-question-tree.component';
import { SchoolTree } from '../modals/choose-school/choose-school.component';
// import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }
  login(formData: any) {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token })};
    return this.http.post('http://localhost:3000/login', formData, httpOptions);
  }

  addAdmin(formData: any) {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token })};
    return this.http.post('http://localhost:3000/addAdmin', formData, httpOptions);
  }

  addSchool(formData: any) {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token })};
    return this.http.post('http://localhost:3000/addSchool', formData, httpOptions);
  }

  addCourse(formData: any) {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token })};
    return this.http.post('http://localhost:3000/addCourse', formData, httpOptions);
  }

  addQuestion(formData: any) {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token })};
    return this.http.post('http://localhost:3000/addQuestion', formData, httpOptions);
  }

  addLinearTree(formData: any) {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token })};
    return this.http.post('http://localhost:3000/addLinearTree', formData, httpOptions);
  }

  getUserLogs(): Observable<Log> {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token }) };
    return this.http.get<Log>('http://localhost:3000/getUserLogs', httpOptions);
  }

  getData(): Observable<Admin> {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token })};
    return this.http.get<Admin>('http://localhost:3000/getData', httpOptions);
  }

  getAppStatus() {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token })};
    return this.http.get('http://localhost:3000/getAppStatus', httpOptions);
  }

  getDataSchool(): Observable<School> {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token }) };
    return this.http.get<School>('http://localhost:3000/getDataSchool', httpOptions);
  }

  getDataSchoolModal(): Observable<SchoolModal> {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token }) };
    return this.http.get<SchoolModal>('http://localhost:3000/getDataSchool', httpOptions);
  }

  getDataCourse(): Observable<Course> {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token }) };
    return this.http.get<Course>('http://localhost:3000/getDataCourse', httpOptions);
  }

  getDataCourseModal(): Observable<CourseModal> {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token }) };
    return this.http.get<CourseModal>('http://localhost:3000/getDataCourse', httpOptions);
  }

  getDataQuestion(): Observable<Question> {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token })};
    return this.http.get<Question>('http://localhost:3000/getDataQuestion', httpOptions);
  }

  getDataQuestionCourse(): Observable<CourseQ> {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token }) };
    return this.http.get<CourseQ>('http://localhost:3000/getDataCourse', httpOptions);
  }

  getDataQuestionEditCourse(): Observable<CourseEditModal> {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token }) };
    return this.http.get<CourseEditModal>('http://localhost:3000/getDataCourse', httpOptions);
  }

  getCourseTree(): Observable<CourseTree> {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token }) };
    return this.http.get<CourseTree>('http://localhost:3000/getDataCourse', httpOptions);
  }

  getAddCourseTree(): Observable<AddCourseTree> {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token }) };
    return this.http.get<AddCourseTree>('http://localhost:3000/getDataCourse', httpOptions);
  }

  getQuestionTree(): Observable<QuestionTree> {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token })};
    return this.http.get<QuestionTree>('http://localhost:3000/getDataQuestion', httpOptions);
  }

  getAddQuestionTree(): Observable<AddQuestionTree> {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token })};
    return this.http.get<AddQuestionTree>('http://localhost:3000/getDataQuestion', httpOptions);
  }

  getSchoolTree(): Observable<SchoolTree> {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token }) };
    return this.http.get<SchoolTree>('http://localhost:3000/getDataSchool', httpOptions);
  }

  getSchoolTreeParent(): Observable<SchoolTreeParent> {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token }) };
    return this.http.get<SchoolTreeParent>('http://localhost:3000/getDataSchool', httpOptions);
  }

  getAddSchoolTree(): Observable<AddSchoolTree> {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token }) };
    return this.http.get<AddSchoolTree>('http://localhost:3000/getDataSchool', httpOptions);
  }

  getCurrentUser(id: number) {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token }) };
    return this.http.get('http://localhost:3000/getCurrentUser/' + id, httpOptions);
  }

  updateAdmin(formData: any) {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token })};
    return this.http.post('http://localhost:3000/updateAdmin', formData, httpOptions);
  }

  updateSchool(formData: any) {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token })};
    return this.http.post('http://localhost:3000/updateSchool', formData, httpOptions);
  }

  updateCourse(formData: any) {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token })};
    return this.http.post('http://localhost:3000/updateCourse', formData, httpOptions);
  }

  updateCurrentUser(formData: any) {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token })};
    return this.http.post('http://localhost:3000/updateCurrentUser', formData, httpOptions);
  }

  updateAppStatus(status: boolean) {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token })};
    return this.http.get('http://localhost:3000/updateAppStatus/' + status, httpOptions);
  }

  updateQuestion(formData: any) {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token })};
    return this.http.post('http://localhost:3000/updateQuestion', formData, httpOptions);
  }

  backupDB() {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token })};
    return this.http.get('http://localhost:3000/backupDB', httpOptions);
  }

  backupTables(formData: any) {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token })};
    return this.http.post('http://localhost:3000/backupTables', formData, httpOptions);
  }

  updateLogs(cond: number, update: number) {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const obj = JSON.parse(localStorage.getItem('currentUser'));
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token }) };
    return this.http.get('http://localhost:3000/updateLogs/' + update + '/' + cond + '/' + obj.username + '/' + obj.id, httpOptions);
  }
}
