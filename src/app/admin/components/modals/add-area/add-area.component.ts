import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { GetsetService } from '../../services/getset.service';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-add-area',
  templateUrl: './add-area.component.html',
  styleUrls: ['./add-area.component.css']
})
export class AddAreaComponent implements OnInit, OnDestroy {
  hide = true;
  addArea: any;
  querySubscription: any;
  flag = false;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddAreaComponent>,
    private getSet: GetsetService,
    private snackBar: MatSnackBar,
    private backendService: BackendService,
  ) {
    this.addArea = this.formBuilder.group({
      area: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ,.\'-]+$')]),
    });
  }

  ngOnInit() {
  }

  addAreaDialog(formData: any) {
    if (this.addArea.valid) {
      this.addArea.get('area').disable();
      this.flag = true;

      this.querySubscription = this.backendService.adminExists(formData).subscribe((res) => {
        if (res["data"].length === 0) {
          this.querySubscription = this.backendService.addArea(formData).subscribe((res2) => {

          },
          (error) => {

          },
          () => {
            this.getSet.getDataArea();
            this.openSnackbar('Area successfully added!');
            this.getSet.updateLogs(21, 0);
            this.dialogRef.close();
          });

        } else {
          this.addArea.get('fname').enable();
          this.flag = false;
          this.openSnackbar('Area already exists.');
        }
      });

    }

  }

  openSnackbar(msg: string) {
    this.snackBar.open(msg , '' , {
      duration: 5000,
    });
  }

  get area() {
    return this.addArea.get('area');
  }

  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }

}
