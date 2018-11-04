import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { PersonDetailComponent } from './person-detail/person-detail.component';
import { PersonEditionComponent } from './person-edition/person-edition.component';
import { PeopleListComponent } from './people-list/people-list.component';
import { AppRoutingModule } from './routing/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { I18nPipe } from './pipes/i18n.pipe';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { AppInitializerProviders } from './app-initializers';
import { HttpInterceptorProviders } from './http-interceptors';
import { LoginComponent } from './login/login.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { TopbarComponent } from './topbar/topbar.component';
import { OuterLayoutComponent } from './layouts/outer-layout/outer-layout.component';
import { InnerLayoutComponent } from './layouts/inner-layout/inner-layout.component';
import { LanguageMenuComponent } from './language-menu/language-menu.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
	declarations: [
		AppComponent,
		PeopleListComponent,
		PersonDetailComponent,
		PersonEditionComponent,
		DashboardComponent,
		I18nPipe,
		CapitalizePipe,
		LoginComponent,
		TopbarComponent,
		OuterLayoutComponent,
		InnerLayoutComponent,
		LanguageMenuComponent,
		SidebarComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		AppRoutingModule,
		HttpClientModule,
		BrowserAnimationsModule,
		AngularMaterialModule
	],
	providers: [
		AppInitializerProviders,
		HttpInterceptorProviders
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
