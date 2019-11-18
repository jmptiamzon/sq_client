import { Component, OnInit, OnDestroy } from '@angular/core';
import { GetsetService } from '../../services/getset.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BackendService } from '../../services/backend.service';
import { MatSnackBar, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-edit-area',
  templateUrl: './edit-area.component.html',
  styleUrls: ['./edit-area.component.css']
})
export class EditAreaComponent implements OnInit, OnDestroy {
  hide = true;
  updateArea: any;
  querySubscription: any;
  flag = false;

  constructor(
    private getSet: GetsetService,
    private formBuilder: FormBuilder,
    private backendService: BackendService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<EditAreaComponent>,
  ) {
    this.updateArea = this.formBuilder.group({
      id: new FormControl(getSet.areaData[0], [Validators.required]),
      area: new FormControl(getSet.areaData[1], [Validators.required, Validators.pattern('^[a-zA-Z ,.\'-]+$')]),
      status: new FormControl(getSet.areaData[2], [Validators.required]),
    });
  }

  ngOnInit() {
  }

  updateAreaDialog(formData: any) {
    if (this.updateArea.valid) {
      this.updateArea.get('area').disable();
      this.updateArea.get('status').disable();
      this.flag = true;

      this.querySubscription = this.backendService.areaExists(formData).subscribe((res) => {
        if (res["data"].length === 0) {
          this.querySubscription = this.backendService.updateArea(formData).subscribe((res2) => {

          },
          (error) => {

          },
          () => {
            this.getSet.getDataArea();
            this.openSnackbar('Area updated successfully!');
            this.getSet.updateLogs(22, formData.id);
            this.dialogRef.close();
          });

        } else if (res["data"].length === 1) {
          if (Number(res["data"][0].id) === Number(formData.id)) {
            this.querySubscription = this.backendService.updateArea(formData).subscribe((res2) => {

            },
            (error) => {

            },
            () => {
              this.getSet.getDataArea();
              this.openSnackbar('Area updated successfully!');
              this.getSet.updateLogs(22, formData.id);
              this.dialogRef.close();
            });

          } else {
            this.updateArea.get('area').enable();
            this.updateArea.get('status').enable();
            this.flag = false;
            this.openSnackbar('Admin already exists.');
          }

        } else {
          this.updateArea.get('area').enable();
          this.updateArea.get('status').enable();
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
    return this.updateArea.get('area');
  }

  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }

}
