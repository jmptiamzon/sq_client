import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeComponent } from './tree.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressButtonsModule } from 'mat-progress-buttons';
import { AddQuestionTreeComponent } from '../modals/add-question-tree/add-question-tree.component';
import { AddMultipleComponent } from '../modals/add-multiple/add-multiple.component';
import { ChooseSchoolComponent } from '../modals/choose-school/choose-school.component';

@NgModule({
  declarations: [
    TreeComponent,
    AddQuestionTreeComponent,
    AddMultipleComponent,
    ChooseSchoolComponent,
  ],
  imports: [
    CommonModule,
    MatStepperModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatSelectModule,
    MatDialogModule,
    MatCheckboxModule,
    MatProgressButtonsModule,
  ],
  exports: [
    TreeComponent,
    AddQuestionTreeComponent,
    AddMultipleComponent,
    ChooseSchoolComponent,
  ],
})
export class TreeModule { }
