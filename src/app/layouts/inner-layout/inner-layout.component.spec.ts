import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerLayoutComponent } from './inner-layout.component';

describe('InnerLayoutComponent', () => {
	let component: InnerLayoutComponent;
	let fixture: ComponentFixture<InnerLayoutComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ InnerLayoutComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(InnerLayoutComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
