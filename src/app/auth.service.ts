import * as moment from "moment";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, shareReplay } from 'rxjs/operators';

import { MessageService } from './message.service';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private authUrl = 'http://localhost:3001/login';

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

					this.log(`Logged in user "${email}"`);
				}),
				catchError(this.handleError<any>('login', []))
			);
	}

	logout() {

		localStorage.removeItem('token');
		localStorage.removeItem('tokenExpiry');
		localStorage.removeItem('role');
		localStorage.removeItem('email');
		localStorage.removeItem('name');
		localStorage.removeItem('photo');
	}

	isLoggedIn() {

		const token = localStorage.getItem('token');
		const tokenExpiry = localStorage.getItem('tokenExpiry');

		return !!token && (!tokenExpiry || moment().isBefore(JSON.parse(tokenExpiry)));
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
