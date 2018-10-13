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
	MatSortModule
} from '@angular/material';

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
		MatSortModule
	]
})
export class AngularMaterialModule { }
