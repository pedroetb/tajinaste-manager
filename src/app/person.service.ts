import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Person } from './person';
import { MessageService } from './message.service';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	})
};

@Injectable({
	providedIn: 'root'
})
export class PersonService {

	private peopleUrl = 'api/people';

	constructor(
		private http: HttpClient,
		private messageService: MessageService
	) { }

	getPeople(): Observable<Person[]> {

		return this.http.get<Person[]>(this.peopleUrl)
			.pipe(
				tap(() => this.log('fetched people')),
				catchError(this.handleError<Person[]>('getPeople', []))
			);
	}

	getPerson(id: number): Observable<Person> {

		const url = `${this.peopleUrl}/${id}`;

		return this.http.get<Person>(url)
			.pipe(
				tap(() => this.log(`fetched person id=${id}`)),
				catchError(this.handleError<Person>('getPerson id=${id}'))
			);
	}

	createPerson(person: Person): Observable<Person> {

		return this.http.post<Person>(this.peopleUrl, person, httpOptions)
			.pipe(
				tap((person: Person) => this.log(`created person id=${person.id}`)),
				catchError(this.handleError<Person>('createPerson'))
			);
	}

	updatePerson(person: Person): Observable<Person> {

		const id = person.id;
		const url = `${this.peopleUrl}/${id}`;

		return this.http.put<Person>(url, person, httpOptions)
			.pipe(
				tap(() => this.log(`updated person id=${id}`)),
				catchError(this.handleError<Person>('updatePerson'))
			);
	}

	deletePerson(person: Person | number): Observable<Person> {

		const id = typeof person === 'number' ? person : person.id;
		const url = `${this.peopleUrl}/${id}`;

		return this.http.delete<Person>(url, httpOptions)
			.pipe(
				tap(() => this.log(`deleted person id=${id}`)),
				catchError(this.handleError<Person>('deletePerson'))
			);
	}

	searchPeople(term: string): Observable<Person[]> {

		const nameValue = term.trim();
		if (!nameValue) {
			return of([]);
		}
		const url = `${this.peopleUrl}/?name=${nameValue}`;

		return this.http.get<Person[]>(url)
			.pipe(
				tap(() => this.log(`found people matching "${nameValue}"`)),
				catchError(this.handleError<Person[]>('searchPeople', []))
			);
	}

	private log(message: string) {

		this.messageService.add(`PersonService: ${message}`);
	}

	private handleError<T> (operation = 'operation', result?: T) {

		return (error: any): Observable<T> => {

			// TODO: send the error to remote logging infrastructure
			console.error(error); // log to console instead

			this.log(`${operation} failed: ${error.message}`);

			return of(result as T);
		};
	}
}
