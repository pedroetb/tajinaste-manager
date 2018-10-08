import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiAuthInterceptor implements HttpInterceptor {

	private apiPrefixRegex = /^api\/.*$/;

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		const apiPrefixMatch = this.apiPrefixRegex.exec(req.url);
		const token = localStorage.getItem('token');

		if (this.apiPrefixRegex.test(req.url) && token) {
			const newReq = req.clone({
				headers: req.headers.set('Authorization', `Bearer ${token}`)
			});

			return next.handle(newReq);
		} else {
			return next.handle(req);
		}
	}
}
