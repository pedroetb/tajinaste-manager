import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.styl']
})
export class SidebarComponent implements OnInit {

	links = {
		dashboard: '/dashboard',
		people: '/people'
	}

	constructor() { }

	ngOnInit() {
	}

}
