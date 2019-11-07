import { Component, OnInit, OnDestroy } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { FormBuilder, Validators, FormControl, FormGroup, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

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
  annualIncome = 0;
  resultsHidden = true;
  userId: any;

  constructor(
    private backendService: BackendService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
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

    this.querySubscription = this.backendService.getAssessmentQuestions().subscribe((res) => {
      this.questions = res["data"];
      this.initFields(res["data"]);
      console.log(this.questions);
    });

    this.querySubscription = this.backendService.getAssessmentCourse().subscribe((res) => {
      this.course = res["data"];
      console.log(this.course);
    });

    this.querySubscription = this.backendService.getAssessmentSchool().subscribe((res) => {
      this.school = res["data"];
    });

  }

  ngOnInit() {
  }

  submitForm(formData: any) {
    if (!this.form.invalid) {
      this.querySubscription = this.backendService.addUser(formData).subscribe((res) => {
        this.userId = res["data"].insertId;
      },
      (error) => {

      },
      () => {
        this.form.get('fname').disable();
        this.form.get('gender').disable();
        this.form.get('age').disable();
        this.form.get('email').disable();
        this.form.get('income').disable();
        this.annualIncome = formData.income;
        this.disableBtn = true;
        this.schoolHidden = false;
      });
    }
  }

  submitSchool(formData: any) {
    if (!this.schoolForm.invalid) {
      this.chosenSchool = formData.selectedSchool;
      this.schoolForm.get('selectedSchool').disable();
      this.disableBtnS = true;
      this.questionHidden = false;
    }
  }

  submitAnswers() {
    let i = 0;
    let flag = true;
    const courseQuestion = [];
    const results = [];
    const courseRank = [];

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
              results[element.course_id] = {course_id: element.course_id, sa: 1};
            } else {
              if (isNaN(results[element.course_id].sa)) {
                results[element.course_id].sa = 1;
              } else {
                results[element.course_id].sa += 1;
              }
            }
          } else if (this.questionForm.get('userAnswer' + element.question_id).value === 'A') {
            if (!results[element.course_id]) {
              results[element.course_id] = {course_id: element.course_id, a: 1};
            } else {
              if (isNaN(results[element.course_id].a)) {
                results[element.course_id].a = 1;
              } else {
                results[element.course_id].a += 1;
              }
            }
          } else if (this.questionForm.get('userAnswer' + element.question_id).value === 'NAD') {
            if (!results[element.course_id]) {
              results[element.course_id] = {course_id: element.course_id, nad: 1};
            } else {
              results[element.course_id].nad += 1;
            }
          } else if (this.questionForm.get('userAnswer' + element.question_id).value === 'D') {
            if (!results[element.course_id]) {
              results[element.course_id] = {course_id: element.course_id, d: 1};
            } else {
              results[element.course_id].d += 1;
            }
          } else {
            if (!results[element.course_id]) {
              results[element.course_id] = {course_id: element.course_id, sd: 1};
            } else {
              results[element.course_id].sd += 1;
            }
          }
        });

        flag = false;
      }

      console.log(Object.keys(results));

      this.resultsHidden = false;
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

  openSnackbar(msg: string) {
    this.snackBar.open(msg, '', {
      duration: 2000,
    });
  }

  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }

}
