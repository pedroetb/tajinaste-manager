import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OuterLayoutComponent } from './outer-layout.component';

describe('OuterLayoutComponent', () => {
	let component: OuterLayoutComponent;
	let fixture: ComponentFixture<OuterLayoutComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ OuterLayoutComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(OuterLayoutComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
