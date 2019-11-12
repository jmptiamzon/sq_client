import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../services/backend.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../../../../assets/css/froala_blocks.css', './home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  querySubscription: any;
  form: any;

  constructor(
    private router: Router,
    private backendService: BackendService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
  ) {
    this.form = formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      subject: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
    });

  }

  ngOnInit() {
    const id = Number(sessionStorage.getItem('id'));
    const token = sessionStorage.getItem('token');

    this.querySubscription = this.backendService.addUserLog(14, id, token).subscribe((res) => {

    });
  }

  changePage(url: string) {
    this.router.navigate([url]);
    window.scrollTo(0, 0);
  }

  openSnackbar(msg: string) {
    this.snackBar.open(msg , '' , {
      duration: 2000,
    });
  }

  sendEmail(formData: any) {
    this.querySubscription = this.backendService.sendContactUs(formData).subscribe((res) => {

    },
    (error) => {

    },
    () => {
      this.openSnackbar('Message successfully sent.');
      this.form.reset();
    });
  }

  get email() {
    return this.form.get('email');
  }

  get subject() {
    return this.form.get('subject');
  }

  get content() {
    return this.form.get('content');
  }

  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }

}
