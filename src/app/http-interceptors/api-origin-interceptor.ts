import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable()
export class ApiOriginInterceptor implements HttpInterceptor {

	private apiOrigin = environment.apiOrigin;
	private apiPrefixRegex = /^api(\/.*)$/;

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		const apiPrefixMatch = this.apiPrefixRegex.exec(req.url);

		if (apiPrefixMatch) {
			const newReq = req.clone({
				url: `${this.apiOrigin}${apiPrefixMatch[1]}`
			});

			return next.handle(newReq);
		} else {
			return next.handle(req);
		}
	}
}
