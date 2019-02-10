import { NgModule } from '@angular/core';
import {
  MatInputModule, MatCardModule, MatTableModule, MatSelectModule,
  MatButtonModule, MatToolbarModule,
  MatExpansionModule, MatDialogModule, MatListModule, MatIconModule
} from '@angular/material';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  exports: [MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatListModule,
    MatDialogModule]
})
export class AngularMaterialModule { }
