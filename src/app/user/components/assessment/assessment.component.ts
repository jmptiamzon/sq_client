import { Component, OnInit, OnDestroy } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { FormBuilder } from '@angular/forms';

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

  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }

}
