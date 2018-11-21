import { Component, OnInit } from '@angular/core';

import * as jspdf from 'jspdf'
import html2canvas from 'html2canvas';

const imgWidth = 208;
const pageHeight = 295;

@Component({
	selector: 'app-report-generator',
	templateUrl: './report-generator.component.html',
	styleUrls: ['./report-generator.component.styl']
})
export class ReportGeneratorComponent implements OnInit {

	constructor() { }

	ngOnInit() { }

	generateReport() {

		const data = document.getElementsByTagName('mat-table')[0];

		html2canvas(data).then(canvas => {

			let imgHeight = canvas.height * imgWidth / canvas.width;

			const contentDataURL = canvas.toDataURL('image/png');

			let pdf = new jspdf();
			pdf.addImage(contentDataURL, 'PNG', 0, 0, imgWidth, imgHeight)
			pdf.save('tajinaste-report.pdf');
		});
	}
}
