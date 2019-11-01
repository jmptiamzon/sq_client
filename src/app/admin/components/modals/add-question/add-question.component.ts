import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { BackendService } from '../../services/backend.service';
import { GetsetService } from '../../services/getset.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

export interface CourseModal {
  id: number;
  school_id: string;
  course_name: string;
  status: boolean;
}

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit, OnDestroy {
  private addQuestionForm: any;
  private querySubscription: any;
  private courseData: any;

  constructor(
    private formBuilder: FormBuilder,
    private getSet: GetsetService,
    private backendService: BackendService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AddQuestionComponent>,
    ) { }

  ngOnInit() {
    this.addQuestionForm = this.formBuilder.group({
      question: new FormControl('', [Validators.required]),
      course: new FormControl('', [Validators.required])
    });

    this.getSet.getDataCourseModal();

    this.querySubscription = this.getSet.changeTableValueCourseModal.subscribe((res) => {
      this.courseData = res["data"];
    });
  }

  addQuestion(formData: any) {
    if (this.addQuestionForm.valid) {
      this.querySubscription = this.backendService.addQuestion(formData).subscribe((res) => {

      },
      (error) => {

      },
      () => {
        this.getSet.getDataQuestion();
        this.openSnackbar('Question added successfully!');
        this.getSet.updateLogs(12, 0);
        this.dialogRef.close();
      });
    }
  }

  openSnackbar(msg: string) {
    this.snackBar.open(msg , '' , {
      duration: 2000,
    });
  }

  findById(id: number) {
    if (id !== 0) {
      return this.courseData.find((x: any) => x.id === id).course_name;
    }
  }

  get question() {
    return this.addQuestionForm.get('question');
  }

  get course() {
    return this.addQuestionForm.get('course');
  }

  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }

}
