import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonEditionComponent } from './person-edition.component';

describe('PersonEditionComponent', () => {
	let component: PersonEditionComponent;
	let fixture: ComponentFixture<PersonEditionComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ PersonEditionComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PersonEditionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
