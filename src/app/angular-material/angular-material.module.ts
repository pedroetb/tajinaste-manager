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
	MatTooltipModule
} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';

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
		LayoutModule
	]
})
export class AngularMaterialModule { }
