import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { GetsetService } from '../services/getset.service';
import { BackendService } from '../services/backend.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { FormBuilder, FormControl, Validators, FormArray, FormGroup, NgControl } from '@angular/forms';
import { AddQuestionTreeComponent } from '../modals/add-question-tree/add-question-tree.component';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { AddMultipleComponent } from '../modals/add-multiple/add-multiple.component';
import { ChooseSchoolComponent } from '../modals/choose-school/choose-school.component';

export interface QuestionTree {
  id: number;
  question: string;
  course_id: number;
  status: boolean;
}

export interface SchoolTreeParent {
  id: number;
  school_name: string;
  min_tuition: bigint;
  max_tuition: bigint;
  status: boolean;
}

export interface CourseTree {
  id: number;
  school_id: string;
  course_name: string;
  status: boolean;
}

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit, OnDestroy {
  querySubscription: any;
  isLinear = true;
  hide = false;
  hide2 = false;
  form: any;
  course: any;
  questionData: any;
  ctr = 0;
  chosenSchool: string;
  school: any;
  schoolId: number;
  chosenQuestions: string[] = [];

  barButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: 'Submit',
    buttonColor: 'primary',
    barColor: 'primary',
    raised: true,
    stroked: false,
    mode: 'indeterminate',
    value: 0,
    disabled: false,
    fullWidth: true,
  };

  constructor(
    private getSet: GetsetService,
    private backendService: BackendService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialog,
  ) {
    this.querySubscription = this.backendService.getQuestionTree().subscribe((res) => {
      this.questionData = res["data"];
    });

    this.querySubscription = this.backendService.getCourseTree().subscribe((res) => {
      this.course = res["data"];
    });

    this.querySubscription = this.backendService.getSchoolTreeParent().subscribe((res) => {
      this.school = res["data"];
    });

    this.initForm();
    this.getSet.appTitle = 'Decision Tree';
  }

  ngOnInit() {
  }

  initForm() {
    this.form = this.formBuilder.group({
      schoolName: new FormControl('', [Validators.required]),
      questions: this.formBuilder.array([ this.initFields() ])
    });
  }

  openSnackbar(msg: string) {
    this.snackBar.open(msg, '', {
      duration: 2000,
    });
  }

  addLinearTree() {
    const dialogVal = this.dialogRef.open(ChooseSchoolComponent, {
      width: '80vh'
    });

    dialogVal.afterClosed().subscribe((res) => {
      if (res !== '') {
        this.initForm();
        this.form.controls.schoolName.setValue(res);
        this.chosenSchool = this.findByIdSchool(res);
        this.schoolId = res;
        this.hide = true;
        this.hide2 = false;
      }
    });
  }

  addBranchingTree() {
    this.hide = false;
    this.hide2 = true;
    this.initForm();
  }

  initFields(): FormGroup {
    return this.formBuilder.group({
      questionValue: new FormControl('', [Validators.required]),
      question: new FormControl({value: '', disabled: true}, [Validators.required])
    });
  }

  get formArr(): FormArray {
    return this.form.get('questions') as FormArray;
  }

  createFields(num: number) {
    if (num !== 0) {
      this.ctr += num;

      for (let x = 0; x < num; x++) {
        this.formArr.push(this.initFields());
      }
    }
  }

  removeFields(num: number) {
    this.ctr -= 1;
    this.formArr.removeAt(num);
    this.chosenQuestions[num] = null;
  }

  questionDialog(num: number) {
    let temp = [];
    temp = this.chosenQuestions.filter(n => n);

    const dialogVal = this.dialogRef.open(AddQuestionTreeComponent, {
      width: '80vh',
      data: {
        schoolId: this.schoolId,
        questionUsed: temp
      }
    });

    dialogVal.afterClosed().subscribe((res) => {
      if (res !== '') {
        this.form.controls.questions.controls[num].controls.question.setValue(this.findById(res));
        this.form.controls.questions.controls[num].controls.questionValue.setValue(res);
        this.chosenQuestions[num] = res;
      }
    });
  }

  addMultiple() {
    const dialogVal = this.dialogRef.open(AddMultipleComponent, {
      width: '80vh'
    });

    dialogVal.afterClosed().subscribe((res) => {
      if (res !== '') {
        this.createFields(res);
      }
    });
  }

  findById(id: number) {
    return this.questionData.find((x: any) => x.id === id).question;
  }

  findByIdSchool(id: number) {
    return this.school.find((x: any) => x.id === id).school_name;
  }

  formSubmit(formData: any) {
    let flag = true;
    this.barButtonOptions.active = true;

    for (const element of formData.questions) {
      if (element.questionValue === '') {
        flag = false;
        this.openSnackbar('Please fill-up all the fields.');
        break;
      }
    }

    if (flag) {
      for (const element of formData.questions) {
        this.getSet.addLinearTree(formData.schoolName, element.questionValue);
      }
    }

    setTimeout(() => {
      this.barButtonOptions.active = false;
    }, 5000);
  }

  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }

}
