import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';

@Component({
	selector: 'app-topbar',
	templateUrl: './topbar.component.html',
	styleUrls: ['./topbar.component.styl']
})
export class TopbarComponent implements OnInit {

	@Input()
	mobileMode: boolean;

	@Output('toggle-sidebar')
	toggleSidebarEvent = new EventEmitter();

	constructor(
		private authService: AuthService,
		private router: Router) { }

	ngOnInit() {
	}

	logout() {

		this.authService.logout();
		this.router.navigateByUrl('login')
	}

	toggleSidebar() {

		this.toggleSidebarEvent.emit();
	}
}
