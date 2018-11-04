import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'capitalize',
	pure: false
})
export class CapitalizePipe implements PipeTransform {

	constructor() {}

	transform(value: any, args?: any): any {

		return value.charAt(0).toUpperCase() + value.slice(1);
	}
}
