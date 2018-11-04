import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthService } from './auth.service'

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {

	constructor(
		private router: Router,
		private authService: AuthService
	) {}

	canActivate() {

		const isLoggedIn = this.authService.checkIsLoggedIn();

		if (!isLoggedIn) {
			this.authService.logout();
			this.router.navigateByUrl('login');
		}

		return isLoggedIn;
	}
}
