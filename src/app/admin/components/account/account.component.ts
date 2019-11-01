import { Component, OnInit, OnDestroy } from '@angular/core';
import { GetsetService } from '../services/getset.service';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BackendService } from '../services/backend.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, OnDestroy {
  private hide = true;
  private panelOpenState = false;
  private currentUser: any;
  private accountForm: any;
  private querySubscription: any;

  private barButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: 'Submit',
    buttonColor: 'primary',
    barColor: 'primary',
    raised: true,
    stroked: false,
    mode: 'indeterminate',
    value: 0,
    disabled: false,
    fullWidth: true,
  };

  constructor(
    private getSet: GetsetService,
    private formBuilder: FormBuilder,
    private backendService: BackendService,
    private snackBar: MatSnackBar,
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.accountForm = formBuilder.group({
      id: new FormControl(),
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
    });

    this.getSet.appTitle = 'My Account';
  }

  ngOnInit() {
    this.accountForm.get('id').setValue(this.currentUser.id);
    this.accountForm.get('fname').setValue(this.currentUser.firstname);
    this.accountForm.get('mname').setValue(this.currentUser.middlename);
    this.accountForm.get('lname').setValue(this.currentUser.lastname);
    this.accountForm.get('uname').setValue(this.currentUser.username);
  }

  openSnackbar(msg: string) {
    this.snackBar.open(msg , '' , {
      duration: 2000,
    });
  }

  editAccount(formData: any) {
    if (this.accountForm.valid) {
      this.barButtonOptions.active = true;

      this.querySubscription = this.backendService.updateCurrentUser(formData).subscribe((res) => {
        // console.log(res["data"]);
      },
      (error) => {
        this.barButtonOptions.active = false;
      },
      () => {
        this.updateLocalStorage();
        this.getSet.updateLogs(10, 0);
        this.openSnackbar('Account successfully updated!');
      });
    }
  }

  updateLocalStorage() {
    this.querySubscription = this.backendService.getCurrentUser(this.currentUser.id).subscribe((res) => {
      localStorage.setItem('currentUser', JSON.stringify(res["data"][0]));
      this.currentUser = res["data"][0];
    },
    (error) => {
      this.barButtonOptions.active = false;
    },
    () => {
      this.openSnackbar('Account successfully updated.');
      this.ngOnInit();
      this.barButtonOptions.active = false;
    }
    );
  }

  get fname() {
    return this.accountForm.get('fname');
  }

  get mname() {
    return this.accountForm.get('mname');
  }

  get lname() {
    return this.accountForm.get('lname');
  }

  get uname() {
    return this.accountForm.get('uname');
  }

  get pword() {
    return this.accountForm.get('pword');
  }

  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }

}
