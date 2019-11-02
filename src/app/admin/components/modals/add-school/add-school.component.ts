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

  constructor(
    private formBuilder: FormBuilder,
    private getSet: GetsetService,
    private backendService: BackendService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AddSchoolComponent>,
  ) { }

  ngOnInit() {
    this.addSchoolForm = this.formBuilder.group({
      sname: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ,.\'-]+$')]),
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
      if (parseFloat(formData.mxtuition) > parseFloat(formData.mntuition)) {
        this.querySubscription = this.backendService.addSchool(formData).subscribe((res) => {

        },
        (error) => {

        },
        () => {
          this.getSet.getDataSchool();
          this.openSnackbar('School successfully added!');
          this.getSet.updateLogs(3, 0);
          this.dialogRef.close();
        });

      }
    }
  }

  openSnackbar(msg: string) {
    this.snackBar.open(msg , '' , {
      duration: 2000,
    });
  }

  get sname() {
    return this.addSchoolForm.get('sname');
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
