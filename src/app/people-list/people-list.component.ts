import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';

import { Person } from '../person';
import { PersonService } from '../person.service';

@Component({
	selector: 'app-people-list',
	templateUrl: './people-list.component.html',
	styleUrls: ['./people-list.component.styl']
})
export class PeopleListComponent implements OnInit {

	people: Person[];
	columns: string[] = ['photo', 'name', 'surname', 'entry', 'actions'];
	dataSource;
	@ViewChild(MatSort) sort: MatSort;

	constructor(private personService: PersonService) {
	}

	ngOnInit() {

		this.getPeople();
	}

	getPeople(): void {

		this.personService.getPeople()
			.subscribe(people => {

				this.people = people;
				this.dataSource = new MatTableDataSource(people);
				this.dataSource.sort = this.sort;
			});
	}

	delete(person: Person): void {

		this.people = this.people.filter(p => p !== person);

		this.personService.deletePerson(person)
			.subscribe();
	}

	applyFilter(value: string) {

		this.dataSource.filter = value.trim().toLowerCase();
	}
}
