import { Component, OnInit, OnDestroy } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { FormBuilder, Validators, FormControl, FormGroup, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import * as CanvasJS from '../../../../assets/js/canvasjs.min.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css']
})
export class AssessmentComponent implements OnInit, OnDestroy {
  querySubscription: any;
  questions: any;
  course: any;
  school: any;
  form: any;
  schoolForm: any;
  questionForm: any;
  questionHidden = true;
  schoolHidden = true;
  chosenSchool: any;
  disableBtn = false;
  disableBtnS = false;
  disableBtnQ = false;
  annualIncome = 0;
  resultsHidden = true;
  dPoints = [];
  userData: any;
  counter = 0;

  constructor(
    private backendService: BackendService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {
    this.form = this.formBuilder.group({
      fname: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ,.\'-]+$')]),
      gender: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      income: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
    });

    this.schoolForm = this.formBuilder.group({
      selectedSchool: new FormControl('', [Validators.required]),
    });

    this.querySubscription = this.backendService.getAssessmentCourse().subscribe((res) => {
      this.course = res["data"];
    });

    this.querySubscription = this.backendService.getAssessmentSchool().subscribe((res) => {
      this.school = res["data"];
    });


    this.querySubscription = this.backendService.getAssessmentQuestions().subscribe((res) => {
      this.questions = res["data"];
      this.initFields(res["data"]);
    });

  }

  ngOnInit() {
    this.querySubscription = this.backendService.getAppStatus().subscribe((res) => {
      if (Number(res["data"][0].status) === 0) {
        this.router.navigate(['maintenance']);
      }
    });

    this.submitLog(17);
  }

  addCounter() {
    this.counter += 1;
    return this.counter;
  }

  submitForm(formData: any) {
    if (!this.form.invalid) {
      formData.visitor_id = Number(sessionStorage.getItem('id'));
      this.userData = formData;

      this.form.get('fname').disable();
      this.form.get('gender').disable();
      this.form.get('age').disable();
      this.form.get('email').disable();
      this.form.get('income').disable();
      this.annualIncome = formData.income;
      this.disableBtn = true;
      this.schoolHidden = false;
      this.submitLog(18);
    }
  }

  submitSchool(formData: any) {
    if (!this.schoolForm.invalid) {
      this.chosenSchool = formData.selectedSchool;
      this.schoolForm.get('selectedSchool').disable();
      this.disableBtnS = true;
      this.questionHidden = false;
      this.submitLog(19);
    }
  }

  submitLog(num: number) {
    const id = Number(sessionStorage.getItem('id'));
    const token = sessionStorage.getItem('token');

    this.querySubscription = this.backendService.addUserLog(num, id, token).subscribe((res) => {

    });
  }

  submitAnswers() {
    let i = 0;
    let flag = true;
    const courseQuestion = [];
    const results = [];
    const finalResults = [];

    if (!this.questionForm.invalid) {
      this.questions.forEach(element => {
        element.course_id.split(',').forEach(elem => {
          this.course.forEach(ele => {
            if (Number(elem) === Number(ele.id)) {
              ele.school_id.split(',').forEach(el => {
                if (Number(this.chosenSchool) === Number(el)) {
                  courseQuestion.push({question_id: i, course_id: elem, school_id: el, course_name: ele.course_name});
                }
              });
            }
          });
        });
        i += 1;
      });
      i = 0;

      while (flag) {
        courseQuestion.forEach(element => {
          if (this.questionForm.get('userAnswer' + element.question_id).value === 'SA') {
            if (!results[element.course_id]) {
              results[element.course_id] = {course_id: element.course_id, total: 5};
            } else {
              if (isNaN(results[element.course_id].total)) {
                results[element.course_id].total = 5;
              } else {
                results[element.course_id].total += 5;
              }
            }
          } else if (this.questionForm.get('userAnswer' + element.question_id).value === 'A') {
            if (!results[element.course_id]) {
              results[element.course_id] = {course_id: element.course_id, total: 4};
            } else {
              if (isNaN(results[element.course_id].total)) {
                results[element.course_id].total = 4;
              } else {
                results[element.course_id].total += 4;
              }
            }
          } else if (this.questionForm.get('userAnswer' + element.question_id).value === 'NAD') {
            if (!results[element.course_id]) {
              results[element.course_id] = {course_id: element.course_id, total: 3};
            } else {
              results[element.course_id].total += 3;
            }
          } else if (this.questionForm.get('userAnswer' + element.question_id).value === 'D') {
            if (!results[element.course_id]) {
              results[element.course_id] = {course_id: element.course_id, total: 2};
            } else {
              results[element.course_id].total += 2;
            }
          } else {
            if (!results[element.course_id]) {
              results[element.course_id] = {course_id: element.course_id, total: 1};
            } else {
              results[element.course_id].total += 1;
            }
          }
        });

        flag = false;
      }
      flag = true;

      this.disableBtnQ = true;

      this.questions.forEach(element => {
        this.questionForm.get('userAnswer' + i).disable();
        i += 1;
      });

      results.forEach(element => {
        finalResults.push(element);
      });

      finalResults.sort((a, b) => {
        return b.total - a.total;
      });

      finalResults.forEach(element => {
        this.course.forEach(ele => {
          if (Number(ele.id) === Number(element.course_id)) {
            element.course_name = ele.course_name;
          }
        });
      });

      finalResults.forEach(element => {
        this.dPoints.push({y: element.total, label: element.course_name});
      });
      i = 0;

      this.querySubscription = this.backendService.addUser(this.userData).subscribe((res) => {
        finalResults.forEach(element => {
          element.userId = res["data"].insertId;
          element.school_id = this.chosenSchool;
          element.rank = i + 1;

          this.querySubscription = this.backendService.addRank(element).subscribe((res) => {

          });

          i += 1;
        });
      });

      const emailData = {visitor: sessionStorage.getItem('token'), email: this.userData.email};
      this.querySubscription = this.backendService.sendSurvey(emailData).subscribe((res) => {

      });

      this.submitLog(19);
      this.renderChart();
    }
  }

  initFields(returnValue: any) {
    this.questionForm = this.formBuilder.group({
      userAnswer: [''],
    });

    let i = 0;
    returnValue.forEach(element => {
      this.questionForm.addControl(
        'userAnswer' + i,
        new FormControl('', [Validators.required])
      );
      i += 1;
    });
  }

  checkForError(id: any) {
    const inputForm = this.questionForm.get('userAnswer' + id);

    if (inputForm.hasError('required')) {
      return true;
    }
    return false;
  }

  get fname() {
    return this.form.get('fname');
  }

  get gender() {
    return this.form.get('gender');
  }

  get age() {
    return this.form.get('age');
  }

  get email() {
    return this.form.get('email');
  }

  get income() {
    return this.form.get('income');
  }

  get selectedSchool() {
    return this.schoolForm.get('selectedSchool');
  }

  renderChart() {
    document.getElementById('chartContainer').style.display = 'block';

    const chart = new CanvasJS.Chart('chartContainer', {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: 'Chosen School: ' + this.findById(this.chosenSchool)
      },
      data: [{
        type: 'column',
        dataPoints: this.dPoints
      }]
    });

    chart.render();
  }

  findById(id: number) {
    return this.questions.find((x: any) => x.id === id).school_name;
  }

  openSnackbar(msg: string) {
    this.snackBar.open(msg, '', {
      duration: 5000,
    });
  }

  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }

}
