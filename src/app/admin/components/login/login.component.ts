import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BackendService } from '../services/backend.service';
import { GetsetService } from '../services/getset.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  adminLogin;
  hide = true;

  constructor(
    private titleService: Title,
    private backendService: BackendService,
    private getSet: GetsetService,
    private route: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    ) {
      this.titleService.setTitle('Admin Login');

      this.adminLogin = this.formBuilder.group({
        uname: new FormControl('', [Validators.required]),
        pword: new FormControl('', [Validators.required])
      });
  }

  private querySubscription;
  error = false;
  errorMessage = '';
  dataLoading = false;

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

  errorSnackbar(msg: string) {
    this.snackBar.open(msg , '' , {
      duration: 2000,
    });
  }

  login(formData) {
    if (formData.uname !== '' && formData.pword !== '') {
      this.barButtonOptions.active = true;
      this.querySubscription = this.backendService.login(formData).subscribe((res) => {
        if (res["errorCode"] > 0) {
          // this.error = false;
          // this.errorMessage = '';
          // this.dataLoading = false;
          this.barButtonOptions.active = false;
          localStorage.setItem('currentUser', JSON.stringify(res["data"][0]));
          localStorage.setItem('token', res["token"].token);
          localStorage.setItem('user', formData.uname);
          this.getSet.updateLogs(0, 0);
          this.route.navigate(['/admin/dashboard']);

        } else {
          // this.error = true;
          // this.errorMessage = res["errorMessage"];
          // this.dataLoading = false;
          this.barButtonOptions.active = false;
          this.errorSnackbar('No such user exists.');
        }

      },

      (error) => {
          this.error = true;
          this.errorMessage = error.message;
          this.dataLoading = false;
          this.barButtonOptions.active = false;
          this.errorSnackbar('An unexpected error occurred.');
      },

      () => {
          this.dataLoading = false;
      });

    }
  }

  ngOnInit() {
    if (window.localStorage.getItem('token')) {
      this.route.navigate(['/admin/dashboard']);
    }
  }

  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }

}
