import { Component, OnInit } from '@angular/core';

import { Person } from '../person';
import { PersonService } from '../person.service';

@Component({
	selector: 'app-people-list',
	templateUrl: './people-list.component.html',
	styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent implements OnInit {

	people: Person[];

	constructor(private personService: PersonService) {
	}

	ngOnInit() {

		this.getPeople();
	}

	getPeople(): void {

		this.personService.getPeople()
			.subscribe(people => this.people = people);
	}

	delete(person: Person): void {

		this.people = this.people.filter(p => p !== person);

		this.personService.deletePerson(person)
			.subscribe();
	}
}
