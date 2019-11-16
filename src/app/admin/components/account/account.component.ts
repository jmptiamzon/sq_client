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
  hide = true;
  panelOpenState = false;
  currentUser: any;
  accountForm: any;
  querySubscription: any;

  barButtonOptions: MatProgressButtonOptions = {
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
      duration: 5000,
    });
  }

  editAccount(formData: any) {
    if (this.accountForm.valid) {
      this.barButtonOptions.active = true;

      this.querySubscription = this.backendService.adminExists(formData).subscribe((res) => {
        if (res["data"].length === 0) {
          this.querySubscription = this.backendService.updateCurrentUser(formData).subscribe((res2) => {
            // console.log(res["data"]);
          },
          (error) => {
            this.barButtonOptions.active = false;
          },
          () => {
            this.updateLocalStorage();
            this.barButtonOptions.disabled = false;
            this.getSet.updateLogs(10, 0);
            this.openSnackbar('Account successfully updated!');
          });

        } else if (res["data"].length === 1) {
          if (Number(formData.id) === Number(res["data"][0].id)) {
            this.querySubscription = this.backendService.updateCurrentUser(formData).subscribe((res2) => {
              // console.log(res["data"]);
            },
            (error) => {
              this.barButtonOptions.active = false;
            },
            () => {
              this.barButtonOptions.disabled = false;
              this.updateLocalStorage();
              this.getSet.updateLogs(10, 0);
              this.openSnackbar('Account successfully updated!');
            });

          } else {
            this.barButtonOptions.disabled = false;
            this.openSnackbar('There is an associated user for that account.');
          }

        } else {
          this.barButtonOptions.disabled = false;
          this.openSnackbar('There is an associated user for that account.');
        }

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
