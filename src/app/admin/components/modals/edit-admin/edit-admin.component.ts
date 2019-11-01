import { Component, OnInit, OnDestroy } from '@angular/core';
import { GetsetService } from '../../services/getset.service';
import { FormBuilder, FormControl, Validators, FormArrayName } from '@angular/forms';
import { BackendService } from '../../services/backend.service';
import { MatDialogRef, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css']
})
export class EditAdminComponent implements OnInit, OnDestroy {
  // checked = true;
  hide = true;
  updateForm: any;
  formValues: any[];
  private querySubscription: any;

  constructor(
    private getSet: GetsetService,
    private formBuilder: FormBuilder,
    private backendService: BackendService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<EditAdminComponent>,
  ) {
    this.updateForm = this.formBuilder.group({
      id: new FormControl('', [Validators.required]),
      fname: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ,.\'-]+$')]),
      mname: new FormControl('', [Validators.pattern('^[a-zA-Z ,.\'-]+$')]),
      lname: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ,.\'-]+$')]),
      uname: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
        Validators.pattern('^[a-zA-Z\-]+$')
      ]),
      pword: new FormControl('', [
        Validators.minLength(8),
        Validators.pattern('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$')
     ]),
      status: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.formValues = this.getSet.adminData;
    this.updateForm.get('id').setValue(this.formValues[0]);
    this.updateForm.get('fname').setValue(this.formValues[1]);
    this.updateForm.get('mname').setValue(this.formValues[2]);
    this.updateForm.get('lname').setValue(this.formValues[3]);
    this.updateForm.get('uname').setValue(this.formValues[4]);
    this.updateForm.get('status').setValue(this.formValues[5]);
  }

  editAdmin(formData: any) {
    if (this.updateForm.valid) {
      this.querySubscription = this.backendService.updateAdmin(formData).subscribe((res) => {

      },
      (error) => {

      },
      () => {
        this.getSet.getData();
        this.openSnackbar('Administrator updated successfully!');
        this.getSet.updateLogs(2, formData.id);
        this.dialogRef.close();
      });
    }
    /*
    if (formData.fname !== this.updateForm.get('fname').value &&
     formData.mname !== this.updateForm.get('mname') formData.lname || formData.uname || formData.pword) !== '') {

    }*/
  }

  openSnackbar(msg: string) {
    this.snackBar.open(msg , '' , {
      duration: 2000,
    });
  }

  get fname() {
    return this.updateForm.get('fname');
  }

  get mname() {
    return this.updateForm.get('mname');
  }

  get lname() {
    return this.updateForm.get('lname');
  }

  get uname() {
    return this.updateForm.get('uname');
  }

  get pword() {
    return this.updateForm.get('pword');
  }

  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }

}
