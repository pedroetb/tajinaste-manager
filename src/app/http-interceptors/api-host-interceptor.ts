import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable()
export class ApiHostInterceptor implements HttpInterceptor {

	private apiHost = environment.apiHost;
	private apiPrefixRegex = /^api(\/.*)$/;

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		const apiPrefixMatch = this.apiPrefixRegex.exec(req.url);

		if (apiPrefixMatch) {
			const newReq = req.clone({
				url: `${this.apiHost}${apiPrefixMatch[1]}`
			});

			return next.handle(newReq);
		} else {
			return next.handle(req);
		}
	}
}
