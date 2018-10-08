import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PersonDetailComponent } from './person-detail/person-detail.component';
import { PersonEditionComponent } from './person-edition/person-edition.component';
import { PeopleListComponent } from './people-list/people-list.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PersonSearchComponent } from './person-search/person-search.component';
import { I18nPipe } from './i18n/i18n.pipe';
import { AppInitializerProviders } from './app-initializers';
import { HttpInterceptorProviders } from './http-interceptors';
import { LoginComponent } from './login/login.component';

@NgModule({
	declarations: [
		AppComponent,
		PeopleListComponent,
		PersonDetailComponent,
		PersonEditionComponent,
		MessagesComponent,
		DashboardComponent,
		PersonSearchComponent,
		I18nPipe,
		LoginComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		AppRoutingModule,
		HttpClientModule
	],
	providers: [
		AppInitializerProviders,
		HttpInterceptorProviders
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
