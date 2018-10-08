import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiHostInterceptor implements HttpInterceptor {

	private apiHost = 'http://localhost:3000';
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
