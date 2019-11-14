import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BackendService } from '../services/backend.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit, OnDestroy {
  querySubscription: any;
  form: any;
  courses: any;
  schools: any;
  id: number;

  constructor(
    private titleService: Title,
    private backendService: BackendService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.form = formBuilder.group({
      schoolEnroll: new FormControl(),
      otherSchool: new FormControl(),
      courseEnroll: new FormControl(),
      otherCourse: new FormControl(),
    });

    const token = this.activatedRoute.snapshot.paramMap.get('user');

    this.querySubscription = this.backendService.getVisitorToken({user_token: token}).subscribe((res) => {
      if (res['data'].length === 0) {
        router.navigate(['']);
      } else {
        this.querySubscription = this.backendService.surveyExists({user_id: res["data"][0].user_id}).subscribe((res2) => {
          if (res2["data"].length !== 0) {
            router.navigate(['']);
          }
        });
      }
      this.id = res["data"][0].user_id;
    });

    this.querySubscription = this.backendService.getSurveyCourse().subscribe((res) => {
      this.courses = res["data"];
    });

    this.querySubscription = this.backendService.getSurveySchool().subscribe((res) => {
      this.schools = res["data"];
    });
  }

  ngOnInit() {
    this.querySubscription = this.backendService.getAppStatus().subscribe((res) => {
      if (Number(res["data"][0].status) === 0) {
        this.router.navigate(['maintenance']);
      }
    });
  }

  submitSurvey(formData: any) {
    // tslint:disable-next-line: max-line-length
    if (this.schoolEnroll.value !== '' && this.courseEnroll.value !== '') {
      formData.id = this.id;
      formData.cond = 1;
      this.submit(formData);
    } else if (this.schoolEnroll.value !== '' && this.otherCourse.value !== '') {
      formData.id = this.id;
      formData.cond = 2;
      this.submit(formData);
    } else if (this.otherSchool.value !== '' && this.courseEnroll.value !== '') {
      formData.id = this.id;
      formData.cond = 3;
      this.submit(formData);
    } else if (this.otherSchool.value !== '' && this.otherCourse.value !== '') {
      formData.id = this.id;
      formData.cond = 4;
      this.submit(formData);
    } else {
      this.openSnackbar('Either one of the fields must be filled-up.');
    }
  }

  openSnackbar(msg: string) {
    this.snackBar.open(msg, '', {
      duration: 5000,
    });
  }

  submit(formData: any) {
    this.querySubscription = this.backendService.addSurvey(formData).subscribe((res) => {
      this.router.navigate(['']);
    });
  }

  get schoolEnroll() {
    return this.form.get('schoolEnroll');
  }

  get courseEnroll() {
    return this.form.get('courseEnroll');
  }

  get otherSchool() {
    return this.form.get('otherSchool');
  }

  get otherCourse() {
    return this.form.get('otherCourse');
  }

  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }

}
