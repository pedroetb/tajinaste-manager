import moment from "moment";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap, shareReplay } from 'rxjs/operators';

import { MessageService } from '../message/message.service';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private authUrl = 'auth/login';
	private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.checkIsLoggedIn());

	constructor(
		private http: HttpClient,
		private messageService: MessageService
	) { }

	login(email:string, password:string) {

		return this.http.post<any>(this.authUrl, {email, password})
			.pipe(
				shareReplay(),
				tap(res => {

					const expiresAt = moment().add(res.expiresIn, 'm');

					localStorage.setItem('token', res.token);
					localStorage.setItem('tokenExpiry', JSON.stringify(expiresAt.valueOf()));
					localStorage.setItem('role', res.role);
					localStorage.setItem('email', res.email);
					localStorage.setItem('name', res.name);
					localStorage.setItem('photo', res.photo);

					this.loggedIn.next(true);
					this.log(`Logged in user "${email}"`);
				}),
				catchError(this.handleError<any>('login', []))
			);
	}

	logout() {

		const email = localStorage.getItem('email');

		localStorage.removeItem('token');
		localStorage.removeItem('tokenExpiry');
		localStorage.removeItem('role');
		localStorage.removeItem('email');
		localStorage.removeItem('name');
		localStorage.removeItem('photo');

		this.loggedIn.next(false);
		this.log(`Logged out user "${email}"`);
	}

	checkIsLoggedIn() {

		const token = localStorage.getItem('token');
		const tokenExpiry = localStorage.getItem('tokenExpiry');

		return !!token && (!tokenExpiry || moment().isBefore(JSON.parse(tokenExpiry)));
	}

	observeIsLoggedIn(): BehaviorSubject<boolean> {

		return this.loggedIn;
	}

	isAdmin() {

		const role = localStorage.getItem('role');

		return role === 'tajinaste_admin';
	}

	private log(message: string) {

		this.messageService.add(`AuthService: ${message}`);
	}

	private handleError<T> (operation = 'operation', result?: T) {

		return (error: any): Observable<T> => {

			// TODO: send the error to remote logging infrastructure
			console.error(error); // log to console instead

			this.log(`${operation} failed: ${error.message}`);

			return throwError(error);
		};
	}
}
