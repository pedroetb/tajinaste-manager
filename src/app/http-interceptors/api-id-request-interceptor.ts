import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiIdRequestInterceptor implements HttpInterceptor {

	private requestByIdRegex = /^(api\/.*)\/(\d+)$/;

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		const requestByIdMatch = this.requestByIdRegex.exec(req.url);

		if (requestByIdMatch) {
			const newReq = req.clone({
				url: `${requestByIdMatch[1]}?id=eq.${requestByIdMatch[2]}`
			});

			return next.handle(newReq);
		} else {
			return next.handle(req);
		}
	}
}
