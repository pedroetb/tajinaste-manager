import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { PersonService } from '../person.service';

@Component({
	selector: 'app-person-edition',
	templateUrl: './person-edition.component.html',
	styleUrls: ['./person-edition.component.styl']
})
export class PersonEditionComponent implements OnInit {

	form: FormGroup;

	constructor(
		private route: ActivatedRoute,
		private personService: PersonService,
		private location: Location,
		private fb: FormBuilder
	) { }

	ngOnInit() {

		this.form = this.fb.group({
			id: [null],
			uuid: [{value: null, disabled: true}],
			name: [null, Validators.required],
			surname: [null, Validators.required],
			dni: [null, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
			entry: [null, Validators.required],
			email: [null, Validators.email],
			phone1: [null],
			phone2: [null],
			occupation: [null],
			notes: [null],
			province: [null],
			locality: [null],
			cp: [null, [Validators.minLength(5), Validators.maxLength(5)]],
			address: [null],
			birth: [null],
			regular: [false],
			federated: [false],
			photo: [null, [Validators.minLength(36), Validators.maxLength(36)]],
			created: [{value: null, disabled: true}],
			sex: [null]
		});

		this.getPerson();
	}

	getPerson(): void {

		const id = +this.route.snapshot.paramMap.get('id');

		if (!id) {
			return;
		}

		this.personService.getPerson(id)
			.subscribe(person => this.form.setValue(person));
	}

	goBack(): void {

		this.location.back();
	}

	submit(): void {

		let value = this.form.value;
		let method;

		if (!this.form.get('id').value) {
			method = 'createPerson';
			delete value.id;
		} else {
			method = 'updatePerson';
		}

		this.personService[method](value)
			.subscribe(() => this.goBack());
	}
}
