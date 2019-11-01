import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BackendService } from '../../services/backend.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { empty } from 'rxjs';

export interface AddQuestionTree {
  id: number;
  question: string;
  course_id: number;
  status: boolean;
}

export interface AddCourseTree {
  id: number;
  school_id: string;
  course_name: string;
  status: boolean;
}

export interface AddSchoolTree {
  id: number;
  school_name: string;
  min_tuition: bigint;
  max_tuition: bigint;
  status: boolean;
}

@Component({
  selector: 'app-add-question-tree',
  templateUrl: './add-question-tree.component.html',
  styleUrls: ['./add-question-tree.component.css']
})
export class AddQuestionTreeComponent implements OnInit, OnDestroy {
  private form: any;
  private querySubscription: any;
  private questionData: any;
  private courseData: any;
  private schoolData: any;
  private ids: number[];
  private flag = false;
  private ctr = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private backendService: BackendService,
    private dialogRef: MatDialogRef<AddQuestionTreeComponent>,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      question: new FormControl('', [Validators.required]),
    });

    this.querySubscription = this.backendService.getAddCourseTree().subscribe((res) => {
      this.courseData = res["data"];

      this.courseData.forEach(element => {
        element.school_id.split(',').forEach(ele => {
          if (Number(this.data.schoolId) === Number(ele)) {
            this.flag = true;
          }
        });

        if (!this.flag) {
          delete this.courseData[this.ctr];
        }

        this.flag = false;
        this.ctr += 1;
      });

      this.courseData = this.courseData.filter(value => Object.keys(value).length !== 0);

      /*
      <ng-container *ngFor="let course of courseData">
        <ng-container *ngFor="let sid of course.school_id.split(',')">
          <ng-container *ngIf="sid == data.schoolId">
            {{addToArray(sid)}}
          </ng-container>
        </ng-container>
      </ng-container>

                <ng-container *ngFor="let id of ids">
            <ng-container *ngFor="let cid of item.course_id.split(',')">
              <ng-container *ngIf="cid == id && item.id != data.questionUsed">
                {{item.question}}
              </ng-container>
            </ng-container>
          </ng-container>
      */
    });

    this.querySubscription = this.backendService.getAddQuestionTree().subscribe((res) => {
      this.questionData = res["data"];
      this.flag = false;
      this.ctr = 0;

      this.questionData.forEach(element => {
        element.course_id.split(',').forEach(ele => {
          this.courseData.forEach(el => {
            if (el) {
              if (Number(el.id) === Number(ele)) {
                this.flag = true;
              }
            }
          });
        });

        if (!this.flag) {
          delete this.questionData[this.ctr];
        }

        this.ctr += 1;
        this.flag = false;
      });

      this.questionData = this.questionData.filter(value => Object.keys(value).length !== 0);
    });
  }

  returnToParent(formData: any) {
    this.dialogRef.close(formData.question);
  }

  addToArray(id: number) {
    if (!this.ids.includes(id)) {
      this.ids.push(id);
    }
  }

  openSnackbar(msg: string) {
    this.snackBar.open(msg, '', {
      duration: 3000,
    });
  }

  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }

}
