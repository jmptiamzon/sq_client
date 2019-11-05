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
    return this.http.get(this.url + 'getAssessmentQuestions', httpOptions);
  }
}
