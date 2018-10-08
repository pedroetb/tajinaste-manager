import { APP_INITIALIZER } from '@angular/core';

import { I18nService } from '../i18n/i18n.service';

function setupI18nFactory(service: I18nService): Function {

	return () => new Promise(resolve => {

		service.useLang('es')
			.subscribe(() => resolve());
	});
}

export const AppInitializerProviders = [{
	provide: APP_INITIALIZER,
	useFactory: setupI18nFactory,
	deps: [ I18nService ],
	multi: true
}];
