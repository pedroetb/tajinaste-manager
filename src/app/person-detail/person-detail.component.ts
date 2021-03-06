import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Person } from '../person/person';
import { PersonService } from '../person/person.service';
import { AuthService } from '../auth/auth.service';

@Component({
	selector: 'app-person-detail',
	templateUrl: './person-detail.component.html',
	styleUrls: ['./person-detail.component.styl']
})
export class PersonDetailComponent implements OnInit {

	person: Person;

	constructor(
		private route: ActivatedRoute,
		private personService: PersonService,
		public authService: AuthService,
		private location: Location
	) { }

	ngOnInit() {

		this.getPerson();
	}

	getPerson(): void {

		const id = +this.route.snapshot.paramMap.get('id');

		this.personService.getPerson(id)
			.subscribe(person => this.person = person);
	}

	delete(person: Person): void {

		this.personService.deletePerson(person)
			.subscribe(() => {
				this.goBack();
			});
	}

	goBack(): void {

		this.location.back();
	}
}
