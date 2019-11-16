import { Component, OnInit, OnDestroy } from '@angular/core';
import { GetsetService } from '../../services/getset.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BackendService } from '../../services/backend.service';
import { MatSnackBar, MatDialogRef } from '@angular/material';

export interface SchoolModal {
  id: number;
  school_name: string;
  min_tuition: bigint;
  max_tuition: bigint;
  status: boolean;
}

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit, OnDestroy {
  querySubscription: any;
  schools: any;
  addCourseForm: any;
  flag = false;

  constructor(
    private formBuilder: FormBuilder,
    private getSet: GetsetService,
    private backendService: BackendService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AddCourseComponent>,
    ) {
      this.addCourseForm = this.formBuilder.group({
        sid: new FormControl('', [Validators.required]),
        cname: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ,.\'-]+$')]),
      });

      this.getSet.getDataSchoolModal();

      this.querySubscription = this.getSet.changeTableValueSchoolModal.subscribe((res) => {
        this.schools = res["data"];
      });

    }

  ngOnInit() {
  }

  addCourse(formData: any) {
    if (this.addCourseForm.valid) {
      this.addCourseForm.get('sid').disable();
      this.addCourseForm.get('cname').disable();
      this.flag = true;

      this.querySubscription = this.backendService.courseExists(formData).subscribe((res) => {
        if (res["data"].length === 0) {
          this.querySubscription = this.backendService.addCourse(formData).subscribe((res2) => {

          },
          (error) => {

          },
          () => {
            this.getSet.getDataCourse();
            this.openSnackbar('Course added successfully!');
            this.getSet.updateLogs(5, 0);
            this.dialogRef.close();
          });

        } else {
          this.addCourseForm.get('sid').enable();
          this.addCourseForm.get('cname').enable();
          this.flag = false;
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

  findById(id: number) {
    if (id !== 0) {
      return this.schools.find((x: any) => x.id === id).school_name;
    }
  }

  get sid() {
    return this.addCourseForm.get('sid');
  }

  get cname() {
    return this.addCourseForm.get('cname');
  }

  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }

}
