import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
	selector: 'app-inner-layout',
	templateUrl: './inner-layout.component.html',
	styleUrls: ['./inner-layout.component.styl']
})
export class InnerLayoutComponent {

	mobileMode;

	constructor(breakpointObserver: BreakpointObserver) {

		breakpointObserver.observe([
			Breakpoints.HandsetPortrait
		]).subscribe(result => this.mobileMode = result.matches);
	}
}
