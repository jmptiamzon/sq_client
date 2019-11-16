import { Component, OnInit, OnDestroy } from '@angular/core';
import { GetsetService } from '../../services/getset.service';
import { BackendService } from '../../services/backend.service';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

export interface CourseEditModal {
  id: number;
  course_name: string;
  school_id: string;
  status: boolean;
}

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent implements OnInit, OnDestroy {
  editQuestionForm: any;
  querySubscription: any;
  courseData: any;
  flag = false;

  constructor(
    private getSet: GetsetService,
    private backendService: BackendService,
    private dialogRef: MatDialogRef<EditQuestionComponent>,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.querySubscription = this.backendService.getDataQuestionEditCourse().subscribe((res) => {
      this.courseData = res["data"];
    });

    this.editQuestionForm = this.formBuilder.group({
      id: new FormControl(this.getSet.questionData[0], [Validators.required]),
      question: new FormControl(this.getSet.questionData[1], [Validators.required]),
      course: new FormControl(this.getSet.questionData[2].split(',').map(Number), [Validators.required]),
      status: new FormControl(this.getSet.questionData[3], [Validators.required]),
    });

  }

  editQuestion(formData: any) {
    if (this.editQuestionForm.valid) {
      this.editQuestionForm.get('question').disable();
      this.editQuestionForm.get('course').disable();
      this.editQuestionForm.get('status').disable();
      this.flag = true;

      this.querySubscription = this.backendService.questionExists(formData).subscribe((res) => {
        if (res["data"].length === 0) {
          this.querySubscription = this.backendService.updateQuestion(formData).subscribe((res2) => {

          },
          (error) => {

          },
          () => {
            this.getSet.getDataQuestion();
            this.openSnackbar('Question updated successfully!');
            this.getSet.updateLogs(13, formData.id);
            this.dialogRef.close();
          });

        } else if (res["data"].length === 1) {
          if (Number(res["data"][0].id) === Number(formData.id)) {
            this.querySubscription = this.backendService.updateQuestion(formData).subscribe((res2) => {

            },
            (error) => {

            },
            () => {
              this.getSet.getDataQuestion();
              this.openSnackbar('Question updated successfully!');
              this.getSet.updateLogs(13, formData.id);
              this.dialogRef.close();
            });

          } else {
            this.editQuestionForm.get('question').enable();
            this.editQuestionForm.get('course').enable();
            this.editQuestionForm.get('status').enable();
            this.flag = false;
            this.openSnackbar('Question already exists.');
          }

        } else {
          this.editQuestionForm.get('question').enable();
          this.editQuestionForm.get('course').enable();
          this.editQuestionForm.get('status').enable();
          this.flag = false;
          this.openSnackbar('Question already exists.');
        }
      });
    }
  }

  findById(id: number) {
    if (id !== 0) {
      return this.courseData.find((x: any) => x.id === id).course_name;
    }
  }

  openSnackbar(msg: string) {
    this.snackBar.open(msg , '' , {
      duration: 5000,
    });
  }

  get question() {
    return this.editQuestionForm.get('question');
  }

  get course() {
    return this.editQuestionForm.get('course');
  }

  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }

}
