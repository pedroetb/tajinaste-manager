import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
	debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Person } from '../person';
import { PersonService } from '../person.service';

@Component({
	selector: 'app-person-search',
	templateUrl: './person-search.component.html',
	styleUrls: ['./person-search.component.css']
})
export class PersonSearchComponent implements OnInit {

	people$: Observable<Person[]>;
	private searchTerms = new Subject<string>();

	constructor(private personService: PersonService) { }

	search(term: string): void {

		this.searchTerms.next(term);
	}

	ngOnInit(): void {

		this.people$ = this.searchTerms.pipe(
			debounceTime(300),
			distinctUntilChanged(),
			switchMap((term: string) => this.personService.searchPeople(term))
		);
	}
}
