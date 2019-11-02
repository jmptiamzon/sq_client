import { Component, OnInit, OnDestroy } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

export interface SchoolTree {
  id: number;
  school_name: string;
  min_tuition: bigint;
  max_tuition: bigint;
  status: boolean;
}

@Component({
  selector: 'app-choose-school',
  templateUrl: './choose-school.component.html',
  styleUrls: ['./choose-school.component.css']
})
export class ChooseSchoolComponent implements OnInit, OnDestroy {
  schoolData: any;
  form: any;
  querySubscription: any;

  constructor(
    private backendService: BackendService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ChooseSchoolComponent>
  ) {
    this.form = formBuilder.group({
      school: new FormControl('', [Validators.required])
    });

    this.querySubscription = this.backendService.getSchoolTree().subscribe((res) => {
      this.schoolData = res["data"];
    });
  }

  ngOnInit() {
  }

  returnToParent(formData: any) {
    this.dialogRef.close(formData.school);
  }

  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }
}
