import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatSortable, MatTableDataSource } from '@angular/material';

import { Person } from '../person';
import { PersonService } from '../person.service';
import { I18nService } from '../i18n/i18n.service';

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
		show: true,
		cell: (row) => this.i18n.translate(row.regular ? 'yes' : 'no')
	},{
		name: 'federated',
		sortable: true,
		show: true,
		cell: (row) => this.i18n.translate(row.federated ? 'yes' : 'no')
	},{
		name: 'actions',
		show: true,
		component: 'rowButtons'
	}];
	people: Person[];
	displayedColumns;
	availableFields;
	dataSource;
	@ViewChild(MatSort) sort: MatSort;

	constructor(
		private personService: PersonService,
		private i18n: I18nService
	) {
	}

	ngOnInit() {

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

				this.dataSource = new MatTableDataSource(this.people);
				this.dataSource.sort = this.sort;
			});
	}

	displayColumns() {

		this.displayedColumns = this.columns
			.filter(column => column.show && this.columnIsAllowed(column))
			.map(column => column.name);
	}

	columnIsAllowed(column) {

		return column.name === 'actions' || this.availableFields.includes(column.name);
	}

	toggleColumn(column) {

		column.show = !column.show;
		this.displayColumns();
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
