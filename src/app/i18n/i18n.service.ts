import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { DateAdapter } from '@angular/material/core';

import { MessageService } from '../message/message.service';

import enI18n from '../../assets/i18n/en.json';
import esI18n from '../../assets/i18n/es.json';

@Injectable({
	providedIn: 'root'
})
export class I18nService {

	languages = {
		en: 'english',
		es: 'spanish'
	};

	data = {
		en: enI18n,
		es: esI18n
	};

	currentLanguage = 'en';

	constructor(
		private messageService: MessageService,
		private adapter: DateAdapter<any>
	) { }

	getLangs() {

		return this.languages;
	}

	useLang(lang: string): Observable<{}> {

		if (this.languages.hasOwnProperty(lang)) {
			this.adapter.setLocale(lang);
			this.currentLanguage = lang;
		} else {
			this.log(`language '${lang}' not found`);
		}

		return of(lang);
	}

	translate(key: string) {

		let value = this.data[this.currentLanguage][key];

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
}
