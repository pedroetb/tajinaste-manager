import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api'; // TODO delete

import { AppComponent } from './app.component';
import { PersonDetailComponent } from './person-detail/person-detail.component';
import { PersonEditionComponent } from './person-edition/person-edition.component';
import { PeopleListComponent } from './people-list/people-list.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InMemoryDataService } from './in-memory-data.service'; // TODO delete
import { PersonSearchComponent } from './person-search/person-search.component';
import { I18nService } from './i18n.service';
import { I18nPipe } from './i18n.pipe';

function setupI18nFactory(service: I18nService): Function {

	return () => new Promise(resolve => {

		service.useLang('es')
			.subscribe(() => resolve());
	});
}

@NgModule({
	declarations: [
		AppComponent,
		PeopleListComponent,
		PersonDetailComponent,
		PersonEditionComponent,
		MessagesComponent,
		DashboardComponent,
		PersonSearchComponent,
		I18nPipe
	],
	imports: [
		BrowserModule,
		FormsModule,
		AppRoutingModule,
		HttpClientModule,
		HttpClientInMemoryWebApiModule.forRoot(
			InMemoryDataService, {
				dataEncapsulation: false,
				passThruUnknownUrl: true
			}
		)
	],
	providers: [{
		provide: APP_INITIALIZER,
		useFactory: setupI18nFactory,
		deps: [ I18nService ],
		multi: true
	}],
	bootstrap: [AppComponent]
})
export class AppModule { }
