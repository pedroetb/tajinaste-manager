import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { DateAdapter } from '@angular/material/core';

import { MessageService } from '../message/message.service';

@Injectable({
	providedIn: 'root'
})
export class I18nService {

	data: any = {};

	languages = {
		es: 'spanish',
		en: 'english'
	}

	constructor(
		private http: HttpClient,
		private messageService: MessageService,
		private adapter: DateAdapter<any>
	) { }

	getLangs() {

		return this.languages;
	}

	useLang(lang: string): Observable<{}> {

		this.adapter.setLocale(lang);

		if (!this.languages.hasOwnProperty(lang)) {
			this.log(`language '${lang}' not found`);
		}

		const langPath = `assets/i18n/${lang}.json`;

		return this.http.get<{}>(langPath)
			.pipe(
				tap(translation => this.data = Object.assign({}, translation || {})),
				catchError(this.handleError<{}>('useLang', {}))
			);
	}

	translate(key: string) {

		let value = this.data[key];

		if (!value) {
			if (value === undefined) {
				console.warn(`Tried to translate missing key '${key}'`);
			}
			return key;
		}

		return value;
	}

	private log(message: string) {

		this.messageService.add(`I18nService: ${message}`);
	}

	private handleError<T> (operation = 'operation', result?: T) {

		return (error: any): Observable<T> => {

			// TODO: send the error to remote logging infrastructure
			console.error(error); // log to console instead

			this.log(`${operation} failed`);

			return of(result as T);
		};
	}
}
