import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { GetsetService } from '../../services/getset.service';
import { BackendService } from '../../services/backend.service';
import { MatDialogRef, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit, OnDestroy {
  hide = true;
  addAdmin: any;
  private querySubscription: any;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddAdminComponent>,
    private getSet: GetsetService,
    private snackBar: MatSnackBar,
    private backendService: BackendService,
    ) {
      this.addAdmin = this.formBuilder.group({
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
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$')
        ])
      });
    }

  ngOnInit() {
  }

  addAdminDialog(formData: any) {
    if (this.addAdmin.valid) {
      this.querySubscription = this.backendService.addAdmin(formData).subscribe((res) => {

      },
      (error) => {

      },
      () => {
        this.getSet.getData();
        this.openSnackbar('Administrator successfully added!');
        this.getSet.updateLogs(1, 0);
        this.dialogRef.close();
      });
    }
  }

  openSnackbar(msg: string) {
    this.snackBar.open(msg , '' , {
      duration: 2000,
    });
  }

  get fname() {
    return this.addAdmin.get('fname');
  }

  get mname() {
    return this.addAdmin.get('mname');
  }

  get lname() {
    return this.addAdmin.get('lname');
  }

  get uname() {
    return this.addAdmin.get('uname');
  }

  get pword() {
    return this.addAdmin.get('pword');
  }

  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }

}
