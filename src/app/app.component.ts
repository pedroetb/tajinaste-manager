import { Component } from '@angular/core';

import { I18nService } from './i18n/i18n.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	title = 'tajinaste-manager';

	constructor(private i18n: I18nService) {}

	setLang(lang: string) {

		this.i18n.useLang(lang)
			.subscribe();
	}
}
