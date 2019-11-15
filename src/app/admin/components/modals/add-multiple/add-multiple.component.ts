import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-multiple',
  templateUrl: './add-multiple.component.html',
  styleUrls: ['./add-multiple.component.css']
})
export class AddMultipleComponent implements OnInit {
  form: any;
  flag = false;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddMultipleComponent>
  ) {
    this.form = this.formBuilder.group({
      number: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
  }

  returnToParent(formData: any) {
    this.form.get('number').disable();
    this.flag = true;

    this.dialogRef.close(formData.number);
  }

}
