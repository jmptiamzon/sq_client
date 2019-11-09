import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { MatTabsModule } from '@angular/material/tabs';
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
import { MatCardModule } from '@angular/material/card';
import { AddAdminComponent } from '../modals/add-admin/add-admin.component';
import { EditAdminComponent } from '../modals/edit-admin/edit-admin.component';
import { UsertblComponent } from '../tables/usertbl/usertbl.component';

@NgModule({
  declarations: [
    UsersComponent,
    AddAdminComponent,
    EditAdminComponent,
    UsertblComponent,
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatPaginatorModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatCardModule,
  ],
  exports: [
    UsersComponent,
    AddAdminComponent,
    EditAdminComponent,
  ]
})
export class UsersModule { }
