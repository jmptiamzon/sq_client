import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AreaComponent } from './area.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatTableExporterModule } from 'mat-table-exporter';
import { AddAreaComponent } from '../modals/add-area/add-area.component';
import { EditAreaComponent } from '../modals/edit-area/edit-area.component';

@NgModule({
  declarations: [
    AreaComponent,
    AddAreaComponent,
    EditAreaComponent,
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatCardModule,
    MatTableExporterModule,
  ],
  exports: [
    AreaComponent,
    AddAreaComponent,
    EditAreaComponent,
  ],
})
export class AreaModule { }
