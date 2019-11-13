import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  // url = 'https://ceval.herokuapp.com/';
  url = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getAssessmentQuestions() {
    // const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get(this.url + 'getAssessmentQuestions', httpOptions);
  }

  getAssessmentCourse() {
    // const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get(this.url + 'getAssessmentCourse', httpOptions);
  }

  getAssessmentSchool() {
    // const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get(this.url + 'getAssessmentSchool', httpOptions);
  }

  addUser(formData: any) {
    // const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.url + 'addUser', formData, httpOptions);
  }

  addVisitor(token: string) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.url + 'addVisitor', {item: token}, httpOptions);
  }

  addUserLog(num: number, id: number, user: string) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.url + 'addUserLog', {user_id: id, log: num, name: user}, httpOptions);
  }

  addRank(formData: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.url + 'addRank', formData, httpOptions);
  }

  sendContactUs(formData: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.url + 'sendContactUs', formData, httpOptions);
  }

  getAppStatus() {
    // const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get(this.url + 'getMaintenance', httpOptions);
  }

  getSurveyCourse() {
    // const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get(this.url + 'getSurveyCourse', httpOptions);
  }

  getSurveySchool() {
    // const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get(this.url + 'getSurveySchool', httpOptions);
  }

  surveyExists(formData: any) {
    // const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.url + 'surveyExists', formData, httpOptions);
  }

  getVisitorToken(formData: any) {
    // const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.url + 'getVisitorToken', formData, httpOptions);
  }

  addSurvey(formData: any) {
    // const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'dummy';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.url + 'addSurvey', formData, httpOptions);
  }


}
