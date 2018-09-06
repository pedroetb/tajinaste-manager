import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PeopleListComponent } from './people-list/people-list.component';
import { PersonDetailComponent }  from './person-detail/person-detail.component';
import { PersonEditionComponent }  from './person-edition/person-edition.component';

const routes: Routes = [{
	path: '',
	redirectTo: '/dashboard',
	pathMatch: 'full'
},{
	path: 'dashboard',
	component: DashboardComponent
},{
	path: 'people',
	component: PeopleListComponent
},{
	path: 'people/:id',
	component: PersonDetailComponent
},{
	path: 'people-edit/:id',
	component: PersonEditionComponent
},{
	path: 'people-add',
	component: PersonEditionComponent
}];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
