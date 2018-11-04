import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
	providedIn: 'root'
})
export class MessageService {

	messages: string[] = [];

	constructor(private snackBar: MatSnackBar) { }

	add(message: string) {

		this.messages.push(message);

		this.snackBar.open(message, undefined, {
			duration: 5000,
			horizontalPosition: 'end'
		});
	}

	clear() {

		this.messages = [];
	}
}
