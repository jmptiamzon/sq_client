import { Component, OnInit, OnDestroy } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css']
})
export class AssessmentComponent implements OnInit, OnDestroy {
  querySubscription: any;
  questions: any;
  course: any;
  form: any;

  constructor(
    private backendService: BackendService,
    private formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      fname: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ,.\'-]+$')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      income: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
    });
    /*
    this.backendService.getAssessmentQuestions().subscribe((res) => {
      this.questions = res["data"];
    });

    this.backendService.getAssessmentCourse().subscribe((res) => {
      this.course = res["data"];
    });*/
  }

  ngOnInit() {
  }

  submitForm(formData: any) {
    if (!this.form.invalid) {
      console.log(formData);
    }
  }

  get fname() {
    return this.form.get('fname');
  }

  get email() {
    return this.form.get('email');
  }

  get income() {
    return this.form.get('income');
  }

  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }

}
