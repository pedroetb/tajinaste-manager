import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Person } from '../person';
import { PersonService } from '../person.service';

@Component({
	selector: 'app-person-edition',
	templateUrl: './person-edition.component.html',
	styleUrls: ['./person-edition.component.css']
})
export class PersonEditionComponent implements OnInit {

	person: Person;

	constructor(
		private route: ActivatedRoute,
		private personService: PersonService,
		private location: Location
	) { }

	ngOnInit() {

		this.getPerson();
	}

	getPerson(): void {

		const id = +this.route.snapshot.paramMap.get('id');

		if (!id) {
			this.person = new Person();
			return;
		}

		this.personService.getPerson(id)
			.subscribe(person => this.person = person);
	}

	goBack(): void {

		this.location.back();
	}

	submit(): void {

		let method = !this.person.id ? 'createPerson' : 'updatePerson';

		this.personService[method](this.person)
			.subscribe(() => this.goBack());
	}
}
