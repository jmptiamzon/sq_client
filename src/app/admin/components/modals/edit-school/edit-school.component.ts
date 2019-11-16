import { Component, OnInit, OnDestroy } from '@angular/core';
import { GetsetService } from '../../services/getset.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-edit-school',
  templateUrl: './edit-school.component.html',
  styleUrls: ['./edit-school.component.css']
})
export class EditSchoolComponent implements OnInit, OnDestroy {
  editSchoolForm: any;
  formValues: any[];
  querySubscription: any;
  flag = false;

  constructor(
    private getSet: GetsetService,
    private formBuilder: FormBuilder,
    private backendService: BackendService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<EditSchoolComponent>,
  ) { }

  ngOnInit() {
    this.editSchoolForm = this.formBuilder.group({
      id: new FormControl('', [Validators.required]),
      sname: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ,.\'-]+$')]),
      mntuition: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
      mxtuition: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
      status: new FormControl(),
    });

    this.mntuition.valueChanges.subscribe((value: any) => {
      if (value !== '') {
        if (parseFloat(value) >= parseFloat(this.mxtuition.value)) {
          this.mntuition.setErrors({msg: 'Minimum tuition must be lower than maximum tuition.'});
          this.mxtuition.setErrors({msg: 'Maximum tuition must be higher than minimum tuition.'});
        } else {
          this.mntuition.setErrors(null);
          this.mxtuition.setErrors(null);
        }
      }
    });

    this.mxtuition.valueChanges.subscribe((value: any) => {
      if (value !== '') {
        if (parseFloat(value) <= parseFloat(this.mntuition.value)) {
          this.mxtuition.setErrors({msg: 'Maximum tuition must be higher than minimum tuition'});
          this.mntuition.setErrors({msg: 'Minimum tuition must be lower than maximum tuition.'});
        } else {
          this.mxtuition.setErrors(null);
          this.mntuition.setErrors(null);
        }
      }
    });

    this.formValues = this.getSet.schoolData;
    this.editSchoolForm.get('id').setValue(this.formValues[0]);
    this.editSchoolForm.get('sname').setValue(this.formValues[1]);
    this.editSchoolForm.get('mntuition').setValue(this.formValues[2]);
    this.editSchoolForm.get('mxtuition').setValue(this.formValues[3]);
    this.editSchoolForm.get('status').setValue(this.formValues[4]);
  }

  editSchool(formData: any) {
    if (this.editSchoolForm.valid) {
      this.editSchoolForm.get('sname').disable();
      this.editSchoolForm.get('mntuition').disable();
      this.editSchoolForm.get('mxtuition').disable();
      this.editSchoolForm.get('status').disable();
      this.flag = true;

      if (parseFloat(formData.mxtuition) > parseFloat(formData.mntuition)) {
        this.querySubscription = this.backendService.schoolExists(formData).subscribe((res) => {
          if (res["data"].length === 0) {
            this.querySubscription = this.backendService.updateSchool(formData).subscribe((res2) => {

            },
            (error) => {

            },
            () => {
              this.getSet.getDataSchool();
              this.openSnackbar('School updated successfully!');
              this.getSet.updateLogs(4, formData.id);
              this.dialogRef.close();
            });

          } else if (res["data"].length === 1) {
            if (Number(res["data"][0].id) === Number(formData.id)) {
              this.querySubscription = this.backendService.updateSchool(formData).subscribe((res2) => {

              },
              (error) => {

              },
              () => {
                this.getSet.getDataSchool();
                this.openSnackbar('School updated successfully!');
                this.getSet.updateLogs(4, formData.id);
                this.dialogRef.close();
              });

            } else {
              this.editSchoolForm.get('sname').enable();
              this.editSchoolForm.get('mntuition').enable();
              this.editSchoolForm.get('mxtuition').enable();
              this.editSchoolForm.get('status').enable();
              this.flag = false;
              this.openSnackbar('School already exists.');
            }

          } else {
              this.editSchoolForm.get('sname').enable();
              this.editSchoolForm.get('mntuition').enable();
              this.editSchoolForm.get('mxtuition').enable();
              this.editSchoolForm.get('status').enable();
              this.flag = false;
              this.openSnackbar('School already exists.');
          }
        });
      }
    }
  }

  openSnackbar(msg: string) {
    this.snackBar.open(msg , '' , {
      duration: 5000,
    });
  }

  get sname() {
    return this.editSchoolForm.get('sname');
  }

  get mntuition() {
    return this.editSchoolForm.get('mntuition');
  }

  get mxtuition() {
    return this.editSchoolForm.get('mxtuition');
  }

  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }

}
