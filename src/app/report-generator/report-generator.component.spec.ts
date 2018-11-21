import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportGeneratorComponent } from './language-menu.component';

describe('ReportGeneratorComponent', () => {
	let component: ReportGeneratorComponent;
	let fixture: ComponentFixture<ReportGeneratorComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ReportGeneratorComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ReportGeneratorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
