import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Person } from './person';
import { MessageService } from './message.service';
import { AuthService } from './auth.service';

const writeHttpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json',
		'Accept': 'application/vnd.pgrst.object+json',
		'Prefer': 'return=representation'
	})
};

@Injectable({
	providedIn: 'root'
})
export class PersonService {

	private url = 'api/people';
	private fields = [{
		name: 'id',
		public: true
	},{
		name: 'uuid',
		public: true
	},{
		name: 'dni'
	},{
		name: 'name',
		public: true
	},{
		name: 'surname',
		public: true
	},{
		name: 'sex'
	},{
		name: 'email'
	},{
		name: 'phone1'
	},{
		name: 'phone2'
	},{
		name: 'occupation'
	},{
		name: 'notes'
	},{
		name: 'province'
	},{
		name: 'locality'
	},{
		name: 'cp'
	},{
		name: 'address'
	},{
		name: 'birth'
	},{
		name: 'entry',
		public: true
	},{
		name: 'regular'
	},{
		name: 'federated',
		public: true
	},{
		name: 'photo',
		public: true
	}];

	constructor(
		private http: HttpClient,
		private messageService: MessageService,
		private authService: AuthService
	) { }

	getPeople(): Observable<Person[]> {

		const url = `${this.url}?select=${this.getFieldNames()}`;

		return this.http.get<Person[]>(url)
			.pipe(
				tap(() => this.log('fetched people')),
				catchError(this.handleError<Person[]>('getPeople', []))
			);
	}

	getPerson(id: number): Observable<Person> {

		const params = this.authService.isAdmin() ? `/${id}` : `?select=${this.getFieldNames()}&id=eq.${id}`;
		const url = `${this.url}${params}`;

		const httpOptions = {
			headers: new HttpHeaders({
				'Accept': 'application/vnd.pgrst.object+json'
			})
		};

		return this.http.get<Person>(url, httpOptions)
			.pipe(
				tap(() => this.log(`fetched person id=${id}`)),
				catchError(this.handleError<Person>('getPerson id=${id}'))
			);
	}

	createPerson(person: Person): Observable<Person> {

		return this.http.post<Person>(this.url, person, writeHttpOptions)
			.pipe(
				tap((person: Person) => this.log(`created person id=${person.id}`)),
				catchError(this.handleError<Person>('createPerson'))
			);
	}

	updatePerson(person: Person): Observable<Person> {

		const id = person.id;
		const url = `${this.url}/${id}`;

		return this.http.patch<Person>(url, person, writeHttpOptions)
			.pipe(
				tap(() => this.log(`updated person id=${id}`)),
				catchError(this.handleError<Person>('updatePerson'))
			);
	}

	deletePerson(person: Person | number): Observable<Person> {

		const id = typeof person === 'number' ? person : person.id;
		const url = `${this.url}/${id}`;

		return this.http.delete<Person>(url, writeHttpOptions)
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
		const url = `${this.url}?select=${this.getFieldNames()}&name=ilike.*${nameValue}*`;

		return this.http.get<Person[]>(url)
			.pipe(
				tap(() => this.log(`found people matching "${nameValue}"`)),
				catchError(this.handleError<Person[]>('searchPeople', []))
			);
	}

	getFields() {

		return this.authService.isAdmin() ? this.fields : this.fields.filter((field) => field.public);
	}

	getFieldNames() {

		return this.getFields().map((field) => field.name);
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
