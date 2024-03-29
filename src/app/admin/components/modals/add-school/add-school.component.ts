import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators, ValidatorFn, FormGroup } from '@angular/forms';
import { GetsetService } from '../../services/getset.service';
import { BackendService } from '../../services/backend.service';
import { MatSnackBar, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-school',
  templateUrl: './add-school.component.html',
  styleUrls: ['./add-school.component.css']
})
export class AddSchoolComponent implements OnInit, OnDestroy {
  addSchoolForm: any;
  querySubscription: any;
  flag = false;
  areas: any;

  constructor(
    private formBuilder: FormBuilder,
    private getSet: GetsetService,
    private backendService: BackendService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AddSchoolComponent>,
  ) {
    this.querySubscription = this.backendService.getArea().subscribe((res) => {
      this.areas = res["data"];
    });
  }

  ngOnInit() {
    this.addSchoolForm = this.formBuilder.group({
      sname: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ,.\'-]+$')]),
      areaSelect: new FormControl('', [Validators.required]),
      mntuition: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ]),
      mxtuition: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]+$')]),
    });

    this.mntuition.valueChanges.subscribe((value: any) => {
      if (value !== '') {
        if (parseFloat(value) >= parseFloat(this.mxtuition.value)) {
          this.mntuition.setErrors({msg: 'Minimum tuition must be lower than maximum tuition.'});
          this.mxtuition.setErrors({msg: 'Maximum tuition must be higher than minimum tuition'});
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
  }

  addSchool(formData: any) {
    if (this.addSchoolForm.valid) {
      this.addSchoolForm.get('sname').disable();
      this.addSchoolForm.get('areaSelect').disable();
      this.addSchoolForm.get('mntuition').disable();
      this.addSchoolForm.get('mxtuition').disable();

      this.flag = true;

      if (parseFloat(formData.mxtuition) > parseFloat(formData.mntuition)) {
        this.querySubscription = this.backendService.schoolExists(formData).subscribe((res) => {
          if (res["data"].length === 0) {
            this.querySubscription = this.backendService.addSchool(formData).subscribe((res2) => {

            },
            (error) => {

            },
            () => {
              this.getSet.getDataSchool();
              this.openSnackbar('School successfully added!');
              this.getSet.updateLogs(3, 0);
              this.dialogRef.close();
            });

          } else {
            this.addSchoolForm.get('sname').enable();
            this.addSchoolForm.get('areaSelect').enable();
            this.addSchoolForm.get('mntuition').enable();
            this.addSchoolForm.get('mxtuition').enable();

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
    return this.addSchoolForm.get('sname');
  }

  get areaSelect() {
    return this.addSchoolForm.get('areaSelect');
  }

  get mntuition() {
    return this.addSchoolForm.get('mntuition');
  }

  get mxtuition() {
    return this.addSchoolForm.get('mxtuition');
  }

  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }

}
