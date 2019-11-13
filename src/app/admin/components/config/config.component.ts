import { Component, OnInit, OnDestroy } from '@angular/core';
import { GetsetService } from '../services/getset.service';
import { BackendService } from '../services/backend.service';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { MatProgressButtonOptions } from 'mat-progress-buttons';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit, OnDestroy {
  currentUser: any;
  checked = true;
  toggleForm: any;
  querySubscription: any;
  cond: string;
  backupTableForm: any;
  tableList: string[] = ['tbladmin', 'tblusers', 'tblschool', 'tblcourse', 'tblquestion', 'tblappstatus'];
  barButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: 'Backup Database',
    buttonColor: 'primary',
    barColor: 'primary',
    raised: true,
    stroked: false,
    mode: 'indeterminate',
    value: 0,
    disabled: false,
    fullWidth: true,
  };

  barButtonOptions2: MatProgressButtonOptions = {
    active: false,
    text: 'Backup Selected Tables',
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
    private snackbar: MatSnackBar,
    private backendService: BackendService,
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.toggleForm = formBuilder.group({
      toggleBtn: new FormControl(),
    });

    this.backupTableForm = formBuilder.group({
      tables: new FormControl('', [Validators.required]),
    });

    this.getSet.appTitle = 'Configuration';
  }

  ngOnInit() {
    this.getAppStatus();
  }

  openSnackbar(msg: string) {
    this.snackbar.open(msg , '' , {
      duration: 5000,
    });
  }

  getAppStatus() {
    this.querySubscription = this.backendService.getAppStatus().subscribe((res) => {
      this.checked = res["data"][0].status === 1 ? true : false;
      this.toggleForm.get('toggleBtn').setValue(this.checked);
    },
    (error) => {
    },
    () => {
    });
  }

  changeStatus() {
    if (this.checked) {
      this.checked = false;
    } else {
      this.checked = true;
    }

    this.querySubscription = this.backendService.updateAppStatus(this.checked).subscribe((res) => {

    },
    (error) => {

    },
    () => {
      this.cond = this.checked ? 'online' : 'offline';
      this.getSet.updateLogs(7, 0);
      this.openSnackbar('Application is now ' + this.cond);
    });
  }

  backupDB() {
    this.barButtonOptions.active = true;
    this.querySubscription = this.backendService.backupDB().subscribe();

    setTimeout(() => {
      this.barButtonOptions.active = false;
      this.getSet.updateLogs(8, 0);
      this.openSnackbar('Database exported successfully.');
    }, 5000);
  }

  backupTables(formData: any) {
    if (this.backupTableForm.valid) {
      this.barButtonOptions2.active = true;
      this.querySubscription = this.backendService.backupTables(formData).subscribe();

      setTimeout(() => {
        this.barButtonOptions2.active = false;
        this.getSet.updateLogs(9, 0);
        this.openSnackbar('Database tables exported successfully.');
      }, 5000);
    }
  }

  get tables(): FormControl {
    return this.backupTableForm.get('tables') as FormControl;
  }

  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }

}
