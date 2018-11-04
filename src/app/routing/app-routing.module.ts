import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/auth-guard';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { InnerLayoutComponent } from '../layouts/inner-layout/inner-layout.component';
import { OuterLayoutComponent } from '../layouts/outer-layout/outer-layout.component';
import { LoginComponent } from '../login/login.component';
import { PeopleListComponent } from '../people-list/people-list.component';
import { PersonDetailComponent }  from '../person-detail/person-detail.component';
import { PersonEditionComponent }  from '../person-edition/person-edition.component';

const routes: Routes = [{
	path: '',
	canActivate: [AuthGuard],
	component: InnerLayoutComponent,
	children: [{
		path: '',
		redirectTo: '/dashboard',
		pathMatch: 'full'
	},{
		path: 'dashboard',
		canActivate: [AuthGuard],
		component: DashboardComponent
	},{
		path: 'people',
		canActivate: [AuthGuard],
		component: PeopleListComponent
	},{
		path: 'people/:id',
		canActivate: [AuthGuard],
		component: PersonDetailComponent
	},{
		path: 'people-edit/:id',
		canActivate: [AuthGuard],
		component: PersonEditionComponent
	},{
		path: 'people-add',
		canActivate: [AuthGuard],
		component: PersonEditionComponent
	}]
},{
	path: '',
	component: OuterLayoutComponent,
	children: [{
		path: 'login',
		component: LoginComponent
	}]
}];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
