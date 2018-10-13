import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.styl']
})
export class LoginComponent implements OnInit {

	form: FormGroup;

	constructor(
		private fb: FormBuilder,
		private authService: AuthService,
		private router: Router) {}

	ngOnInit() {

		this.form = this.fb.group({
			email: ['', Validators.required],
			password: ['', Validators.required]
		});
	}

	login() {

		const values = this.form.value;
		this.authService.login(values.email, values.password)
			.subscribe(
				() => this.router.navigateByUrl('')
			);
	}
}
