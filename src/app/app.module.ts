import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api'; // TODO delete

import { AppComponent } from './app.component';
import { PersonDetailComponent } from './person-detail/person-detail.component';
import { PersonEditionComponent } from './person-edition/person-edition.component';
import { PeopleListComponent } from './people-list/people-list.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InMemoryDataService } from './in-memory-data.service';
import { PersonSearchComponent } from './person-search/person-search.component'; // TODO delete

registerLocaleData(localeEs, 'es');

@NgModule({
	declarations: [
		AppComponent,
		PeopleListComponent,
		PersonDetailComponent,
		PersonEditionComponent,
		MessagesComponent,
		DashboardComponent,
		PersonSearchComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		AppRoutingModule,
		HttpClientModule,
		HttpClientInMemoryWebApiModule.forRoot(
			InMemoryDataService, { dataEncapsulation: false }
		)
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
