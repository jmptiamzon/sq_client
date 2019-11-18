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
import { User } from '../tables/usertbl/usertbl.component';
import { LogTbl } from '../tables/userlog/userlog.component';
import { Area } from '../area/area.component';
// import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  url = 'https://ceval.herokuapp.com/';
  // url = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }
  login(formData: any) {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token })};
    return this.http.post(this.url + 'login', formData, httpOptions);
  }

  addAdmin(formData: any) {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token })};
    return this.http.post(this.url + 'addAdmin', formData, httpOptions);
  }

  addArea(formData: any) {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token })};
    return this.http.post(this.url + 'addArea', formData, httpOptions);
  }

  addSchool(formData: any) {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token })};
    return this.http.post(this.url + 'addSchool', formData, httpOptions);
  }

  addCourse(formData: any) {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token })};
    return this.http.post(this.url + 'addCourse', formData, httpOptions);
  }

  addQuestion(formData: any) {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token })};
    return this.http.post(this.url + 'addQuestion', formData, httpOptions);
  }

  addLinearTree(formData: any) {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token })};
    return this.http.post(this.url + 'addLinearTree', formData, httpOptions);
  }

  deleteLinearTree(formData: any) {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token })};
    return this.http.post(this.url + 'deleteLinearTree', formData, httpOptions);
  }

  getUserLogs(type: number): Observable<Log> {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token }) };
    return this.http.get<Log>(this.url + 'getUserLogs/' + type, httpOptions);
  }

  getUserLogs2(type: number): Observable<LogTbl> {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token }) };
    return this.http.get<LogTbl>(this.url + 'getUserLogs/' + type, httpOptions);
  }

  getData(): Observable<Admin> {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token })};
    return this.http.get<Admin>(this.url + 'getData', httpOptions);
  }

  getAppStatus() {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token })};
    return this.http.get(this.url + 'getAppStatus', httpOptions);
  }

  getDataArea(): Observable<Area> {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token }) };
    return this.http.get<Area>(this.url + 'getDataArea', httpOptions);
  }

  getArea() {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token }) };
    return this.http.get(this.url + 'getDataArea', httpOptions);
  }

  getDataAreaModal(): Observable<SchoolModal> {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token }) };
    return this.http.get<SchoolModal>(this.url + 'getDataArea', httpOptions);
  }

  getDataSchool(): Observable<School> {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token }) };
    return this.http.get<School>(this.url + 'getDataSchool', httpOptions);
  }

  getDataSchoolModal(): Observable<SchoolModal> {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token }) };
    return this.http.get<SchoolModal>(this.url + 'getDataSchool', httpOptions);
  }

  getDataCourse(): Observable<Course> {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token }) };
    return this.http.get<Course>(this.url + 'getDataCourse', httpOptions);
  }

  getDataCourseModal(): Observable<CourseModal> {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token }) };
    return this.http.get<CourseModal>(this.url + 'getDataCourse', httpOptions);
  }

  getDataQuestion(): Observable<Question> {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token })};
    return this.http.get<Question>(this.url + 'getDataQuestion', httpOptions);
  }

  getDataQuestionCourse(): Observable<CourseQ> {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token }) };
    return this.http.get<CourseQ>(this.url + 'getDataCourse', httpOptions);
  }

  getDataQuestionEditCourse(): Observable<CourseEditModal> {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token }) };
    return this.http.get<CourseEditModal>(this.url + 'getDataCourse', httpOptions);
  }

  getCourseTree(): Observable<CourseTree> {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token }) };
    return this.http.get<CourseTree>(this.url + 'getDataCourse', httpOptions);
  }

  getAddCourseTree(): Observable<AddCourseTree> {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token }) };
    return this.http.get<AddCourseTree>(this.url + 'getDataCourse', httpOptions);
  }

  getQuestionTree(): Observable<QuestionTree> {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token })};
    return this.http.get<QuestionTree>(this.url + 'getDataQuestion', httpOptions);
  }

  getAddQuestionTree(): Observable<AddQuestionTree> {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token })};
    return this.http.get<AddQuestionTree>(this.url + 'getDataQuestion', httpOptions);
  }

  getSchoolTree(): Observable<SchoolTree> {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token }) };
    return this.http.get<SchoolTree>(this.url + 'getDataSchool', httpOptions);
  }

  getSchoolTreeParent(): Observable<SchoolTreeParent> {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token }) };
    return this.http.get<SchoolTreeParent>(this.url + 'getDataSchool', httpOptions);
  }

  getAddSchoolTree(): Observable<AddSchoolTree> {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token }) };
    return this.http.get<AddSchoolTree>(this.url + 'getDataSchool', httpOptions);
  }

  getCurrentUser(id: number) {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token }) };
    return this.http.get(this.url + 'getCurrentUser/' + id, httpOptions);
  }

  updateAdmin(formData: any) {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token })};
    return this.http.post(this.url + 'updateAdmin', formData, httpOptions);
  }

  updateArea(formData: any) {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token })};
    return this.http.post(this.url + 'updateArea', formData, httpOptions);
  }

  updateSchool(formData: any) {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token })};
    return this.http.post(this.url + 'updateSchool', formData, httpOptions);
  }

  updateCourse(formData: any) {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token })};
    return this.http.post(this.url + 'updateCourse', formData, httpOptions);
  }

  updateCurrentUser(formData: any) {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token })};
    return this.http.post(this.url + 'updateCurrentUser', formData, httpOptions);
  }

  updateAppStatus(status: boolean) {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token })};
    return this.http.get(this.url + 'updateAppStatus/' + status, httpOptions);
  }

  updateQuestion(formData: any) {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token })};
    return this.http.post(this.url + 'updateQuestion', formData, httpOptions);
  }

  backupDB() {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token })};
    return this.http.get(this.url + 'backupDB', httpOptions);
  }

  backupTables(formData: any) {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token })};
    return this.http.post(this.url + 'backupTables', formData, httpOptions);
  }

  updateLogs(cond: number, update: number) {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const obj = JSON.parse(localStorage.getItem('currentUser'));
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token }) };
    return this.http.get(this.url + 'updateLogs/' + update + '/' + cond + '/' + obj.username + '/' + obj.id, httpOptions);
  }

  getUserCount() {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token }) };
    return this.http.get(this.url + 'getUserCount', httpOptions);
  }

  getAdminCount() {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token }) };
    return this.http.get(this.url + 'getAdminCount', httpOptions);
  }

  getDbUpdate() {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token }) };
    return this.http.get(this.url + 'getDbUpdate', httpOptions);
  }

  getUsers(): Observable<User> {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token }) };
    return this.http.get<User>(this.url + 'getUsers', httpOptions);
  }

  getChosenSchool(year: string) {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token }) };
    return this.http.get(this.url + 'getChosenSchool/' + year, httpOptions);
  }

  getVisitors(year: string) {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token }) };
    return this.http.get(this.url + 'getVisitors/' + year, httpOptions);
  }

  getSuggestedCourse(year: string) {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token }) };
    return this.http.get(this.url + 'getSuggestedCourse/' + year, httpOptions);
  }

  getConversionCount(year: string) {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token }) };
    return this.http.get(this.url + 'getConversionCount/' + year, httpOptions);
  }

  adminExists(formData: any) {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token }) };
    return this.http.post(this.url + 'adminExists', formData, httpOptions);
  }

  areaExists(formData: any) {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token }) };
    return this.http.post(this.url + 'areaExists', formData, httpOptions);
  }

  schoolExists(formData: any) {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token }) };
    return this.http.post(this.url + 'schoolExists', formData, httpOptions);
  }

  courseExists(formData: any) {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token }) };
    return this.http.post(this.url + 'courseExists', formData, httpOptions);
  }

  questionExists(formData: any) {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token }) };
    return this.http.post(this.url + 'questionExists', formData, httpOptions);
  }

  getTrees() {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token }) };
    return this.http.get(this.url + 'getTrees', httpOptions);
  }

  getSurvey(year: number) {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token }) };
    return this.http.get(this.url + 'getSurvey/' + year, httpOptions);
  }

}
