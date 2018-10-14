import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	MatButtonModule,
	MatInputModule,
	MatCardModule,
	MatToolbarModule,
	MatMenuModule,
	MatIconModule,
	MatSidenavModule,
	MatListModule,
	MatRadioModule,
	MatTooltipModule,
	MatSnackBarModule,
	MatTableModule,
	MatSortModule,
	MatDatepickerModule,
	MatCheckboxModule
} from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

@NgModule({
	exports: [
		MatButtonModule,
		MatInputModule,
		MatCardModule,
		MatToolbarModule,
		MatMenuModule,
		MatIconModule,
		MatSidenavModule,
		MatListModule,
		MatRadioModule,
		MatTooltipModule,
		MatSnackBarModule,
		MatTableModule,
		MatSortModule,
		MatDatepickerModule,
		MatMomentDateModule,
		MatCheckboxModule
	]
})
export class AngularMaterialModule { }
