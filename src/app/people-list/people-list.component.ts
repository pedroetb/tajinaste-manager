import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatSortable, MatTableDataSource } from '@angular/material';

import { Person } from '../person';
import { PersonService } from '../person.service';
import { I18nService } from '../i18n/i18n.service';
import { AuthService } from '../auth.service';

@Component({
	selector: 'app-people-list',
	templateUrl: './people-list.component.html',
	styleUrls: ['./people-list.component.styl']
})
export class PeopleListComponent implements OnInit {

	columns = [{
		name: 'photo',
		show: true,
		component: 'rowAvatar'
	},{
		name: 'id',
		sortable: true
	},{
		name: 'uuid',
		sortable: true
	},{
		name: 'dni',
		sortable: true
	},{
		name: 'name',
		show: true,
		sortable: true
	},{
		name: 'surname',
		show: true,
		sortable: true
	},{
		name: 'sex',
		sortable: true,
		cell: (row) => this.i18n.translate(row.sex === 'f' ? 'female' : row.sex === 'm' ? 'male' : 'other')
	},{
		name: 'email',
		sortable: true
	},{
		name: 'phone1',
		sortable: true
	},{
		name: 'phone2',
		sortable: true
	},{
		name: 'occupation',
		sortable: true
	},{
		name: 'notes',
		sortable: true
	},{
		name: 'province',
		sortable: true
	},{
		name: 'locality',
		sortable: true
	},{
		name: 'cp',
		sortable: true
	},{
		name: 'address',
		sortable: true
	},{
		name: 'birth',
		sortable: true
	},{
		name: 'entry',
		show: true,
		sortable: true
	},{
		name: 'regular',
		sortable: true,
		boolean: true,
		cell: (row) => this.i18n.translate(row.regular ? 'yes' : 'no')
	},{
		name: 'federated',
		sortable: true,
		boolean: true,
		cell: (row) => this.i18n.translate(row.federated ? 'yes' : 'no')
	},{
		name: 'actions',
		show: true,
		component: 'rowButtons'
	}];
	people: Person[];
	displayedColumns;
	availableFields;
	textFilter = '';
	dataSource;
	@ViewChild(MatSort) sort: MatSort;

	constructor(
		private personService: PersonService,
		private authService: AuthService,
		private i18n: I18nService
	) {
	}

	ngOnInit() {

		this.booleanColumns = this.columns
			.filter(column => column.boolean)
			.map(column => column.name);

		this.sort.sort(<MatSortable>{
			id: 'entry',
			start: 'asc'
		});
		this.availableFields = this.personService.getFieldNames();
		this.displayColumns();
		this.getPeople();
	}

	getPeople(): void {

		this.personService.getPeople()
			.subscribe(people => {

				this.people = people;

				this.createDataSource(this.people);
			});
	}

	createDataSource(data) {

		this.dataSource = new MatTableDataSource(data);
		this.dataSource.sort = this.sort;
		this.dataSource.filter = this.textFilter;
	}

	displayColumns() {

		this.displayedColumns = this.columns
			.filter(column => column.show && this.columnIsAllowed(column))
			.map(column => column.name);
	}

	columnIsAllowed(column) {

		return column.name === 'actions' || this.availableFields.includes(column.name);
	}

	onFieldsChange(evt) {

		let column = evt.option.value;

		column.show = !column.show;
		this.displayColumns();
	}

	onBooleanFilterChange(value) {

		if (!this.people) {
			return;
		}

		let data = this.people.filter(person => {

			for (let field of value) {
				if (!person[field]) {
					return false;
				}
			}

			return true;
		});

		this.createDataSource(data);
	}

	delete(person: Person): void {

		this.personService.deletePerson(person)
			.subscribe(() => {
				this.people = this.people.filter(p => p !== person);
				this.createDataSource(this.people);
			});
	}

	applyFilter(value: string) {

		let textFilter = value.trim().toLowerCase();
		this.dataSource.filter = textFilter;
		this.textFilter = textFilter;
	}
}
