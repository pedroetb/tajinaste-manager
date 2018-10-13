import { Component, OnInit } from '@angular/core';

import { I18nService } from '../i18n/i18n.service';

@Component({
	selector: 'app-language-menu',
	templateUrl: './language-menu.component.html',
	styleUrls: ['./language-menu.component.styl']
})
export class LanguageMenuComponent implements OnInit {

	languages;

	constructor(private i18n: I18nService) { }

	ngOnInit() {

		this.languages = this.i18n.getLangs();
	}

	setLang(lang: string) {

		this.i18n.useLang(lang)
			.subscribe();
	}
}
