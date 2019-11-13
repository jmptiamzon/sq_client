import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { GetsetService } from '../../services/getset.service';
import { MatSnackBar, MatDialogRef } from '@angular/material';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit, OnDestroy {
  editCourseForm: any;
  formValues: any[];
  querySubscription: any;
  schools: any;
  // private test: string[] = ['1', '2'];

  constructor(
    private formBuilder: FormBuilder,
    private getSet: GetsetService,
    private snackBar: MatSnackBar,
    private backendService: BackendService,
    private dialogRef: MatDialogRef<EditCourseComponent>,
  ) {
    this.editCourseForm = this.formBuilder.group({
      id: new FormControl('', [Validators.required]),
      sid: new FormControl('', [Validators.required]),
      cname: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ,.\'-]+$')]),
      status: new FormControl(),
    });

    this.getSet.getDataSchoolModal();

    this.querySubscription = this.getSet.changeTableValueSchoolModal.subscribe((res) => {
      this.schools = res["data"];
    });
  }

  ngOnInit() {
    this.formValues = this.getSet.courseData;
    this.editCourseForm.get('id').setValue(this.formValues[0]);
    this.editCourseForm.get('sid').setValue(this.formValues[1].split(',').map(Number));
    this.editCourseForm.get('cname').setValue(this.formValues[2]);
    this.editCourseForm.get('status').setValue(this.formValues[3]);
  }

  editCourse(formData: any) {
    if (this.editCourseForm.valid) {
      this.querySubscription = this.backendService.courseExists(formData).subscribe((res) => {
        if (res["data"].length === 0) {
          this.querySubscription = this.backendService.updateCourse(formData).subscribe((res2) => {

          },
          (error) => {

          },
          () => {
            this.getSet.getDataCourse();
            this.openSnackbar('Course successfully updated!');
            this.getSet.updateLogs(6, formData.id);
            this.dialogRef.close();
          });

        } else if (res["data"].length === 1) {
          if (Number(res["data"][0].id) === Number(formData.id)) {
            this.querySubscription = this.backendService.updateCourse(formData).subscribe((res2) => {

            },
            (error) => {

            },
            () => {
              this.getSet.getDataCourse();
              this.openSnackbar('Course successfully updated!');
              this.getSet.updateLogs(6, formData.id);
              this.dialogRef.close();
            });

          } else {
            this.openSnackbar('Course already exists.');
          }

        } else {
          this.openSnackbar('Course already exists.');
        }
      });
    }
  }

  openSnackbar(msg: string) {
    this.snackBar.open(msg , '' , {
      duration: 5000,
    });
  }

  get cname() {
    return this.editCourseForm.get('cname');
  }

  get sid(): FormControl {
    return this.editCourseForm.get('sid') as FormControl;
  }

  ngOnDestroy(): void {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }

}
