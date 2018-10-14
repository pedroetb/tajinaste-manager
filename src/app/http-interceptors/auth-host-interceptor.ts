import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable()
export class AuthHostInterceptor implements HttpInterceptor {

	private authHost = environment.authHost;
	private authPrefixRegex = /^auth(\/.*)$/;

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		const authPrefixMatch = this.authPrefixRegex.exec(req.url);

		if (authPrefixMatch) {
			const newReq = req.clone({
				url: `${this.authHost}${authPrefixMatch[1]}`
			});

			return next.handle(newReq);
		} else {
			return next.handle(req);
		}
	}
}
