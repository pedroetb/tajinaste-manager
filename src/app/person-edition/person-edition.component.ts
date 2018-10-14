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
			id: [''],
			uuid: [{value: '', disabled: true}],
			name: ['', Validators.required],
			surname: ['', Validators.required],
			dni: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
			entry: ['', Validators.required],
			email: ['', Validators.email],
			phone1: ['', Validators.phone],
			phone2: ['', Validators.phone],
			occupation: [''],
			notes: [''],
			province: [''],
			locality: [''],
			cp: ['', [Validators.minLength(5), Validators.maxLength(5)]],
			address: [''],
			birth: [''],
			regular: [''],
			federated: [''],
			photo: ['', [Validators.minLength(36), Validators.maxLength(36)]],
			created: [{value: '', disabled: true}],
			sex: ['']
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

		let method = !this.form.get('id').value ? 'createPerson' : 'updatePerson';

		this.personService[method](this.form.value)
			.subscribe(() => this.goBack());
	}
}
