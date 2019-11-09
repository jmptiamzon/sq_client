import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigComponent } from './config.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressButtonsModule } from 'mat-progress-buttons';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [ConfigComponent],
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatProgressButtonsModule,
    MatIconModule,
    MatExpansionModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCardModule,
  ],
  exports: [
    ConfigComponent,
  ],
})
export class ConfigModule { }
