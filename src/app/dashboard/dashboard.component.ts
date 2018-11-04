import { Component, OnInit } from '@angular/core';
import { Person } from '../person';
import { PersonService } from '../person.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: [ './dashboard.component.styl' ]
})
export class DashboardComponent implements OnInit {

	people: Person[] = [];

	constructor(private personService: PersonService) { }

	ngOnInit() {

		this.getPeople();
	}

	getPeople(): void {

		this.personService.getPeople('&regular=eq.true')
			.subscribe(people => this.people = people);
	}
}
